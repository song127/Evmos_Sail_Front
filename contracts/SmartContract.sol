// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface UniswapV2Router02 {
    function factory() external pure returns (address);

    function getAmountsIn(uint amountOut, address[] memory path) external view returns (uint[] memory amounts);

    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);

    function WETH() external pure returns (address);

    // ETH to DAI
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);

    // DAI to ETH
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

contract SmartContract is Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    address aaveLendingPoolAdd;
    address aaveGateWayAdd;
    UniswapV2Router02 uniSwapRouter;
    address depositTokenAdd;
    //    address[] shortTokenAddList;

    mapping(address => User) userList;

    uint256 commissionFee;

    struct User {
        address mainWallet;
        uint256 amount; // DAI
        uint256 collateralAmount; // DAI
        uint256 shortDaiAmount; // DAI
        uint256 shortAmount; // ETH
        uint256 commission; // DAI
    }

    constructor(
        address initAaveLendingPoolAdd,
        address initAaveGateWayAdd,
        UniswapV2Router02 initUniSwapRouter,
    //        address[] initShortTokenAdd,
        address initDepositTokenAdd,
        uint initCommissionFee
    ) {
        aaveLendingPoolAdd = initAaveLendingPoolAdd;
        aaveGateWayAdd = initAaveGateWayAdd;
        depositTokenAdd = initDepositTokenAdd;
        //        shortTokenAdd = initShortTokenAddList;
        uniSwapRouter = initUniSwapRouter;
        commissionFee = initCommissionFee;
    }

    // front
    function depositToken(address _subWallet, uint256 _amount) external {
        //        require(msg.sender != _subWallet, "Not Valid address!!");
//        require(_amount >= 0, "Amount is not negative");
//        require(IERC20(depositTokenAdd).balanceOf(msg.sender) > _amount, "You don't have enough token");

        IERC20(depositTokenAdd).transferFrom(msg.sender, address(this), _amount);
        if (userList[_subWallet].mainWallet != address(0)) {
            userList[_subWallet].amount += _amount;
        } else {
            userList[_subWallet] = User(msg.sender, _amount, 0, 0, 0, 0);
        }
    }

    // back
    function withdrawToken(uint256 _amount, address _to) external {
//        require(userList[msg.sender].mainWallet != address(0), "User Not Exist");
//        require(_amount >= 0, "Amount is not negative");
//        require(userList[msg.sender].amount < _amount, "You don't have enough token in this contract");

        userList[msg.sender].amount -= _amount;
        IERC20(depositTokenAdd).transferFrom(address(this), _to, _amount);
    }

    // back
    //    function shortStart(IERC20 _shortToken, uint256 _collateralAmount, uint256 _borrowAmount) external {
    //        require(userList[msg.sender].shortAmount == 0, "Please End The Short");
    //        require(userList[msg.sender].mainWallet != 0, "Not Valid User");
    //        require(_collateralAmount <= userList[msg.sender].amount, 'balance is low');
    //
    //        var (sResult, sData) = _supply(_collateralAmount);
    //        require(sResult, "Supply Fail");
    //        userList[msg.sender].amount -= _collateralAmount;
    //        userList[msg.sender].collateralAmount += _collateralAmount;
    //
    ////        var (bResult, bData) = _borrow(_shortToken, _borrowAmount);
    ////        require(bResult, "Borrow Fail");
    ////        userList[msg.sender].shortAmount += _borrowAmount;
    ////        userList[msg.sender].commission += _borrowAmount * commissionFee;
    ////
    ////        _EthToDai(_borrowAmount);
    //    }

    function supply(uint256 _amount) external returns (bytes memory) {
        //        require(userList[msg.sender].shortAmount == 0, "Please End The Short");
        //        require(userList[msg.sender].mainWallet != 0, "Not Valid User");
//        require(_amount <= userList[msg.sender].amount, 'balance is low');

        (bool success, bytes memory data) = aaveLendingPoolAdd.call{gas : 400000}(
            abi.encodeWithSignature(
                "deposit(address,uint256,address,uint16)", depositTokenAdd, _amount, msg.sender, 0
            )
        );
        require(success, 'FAIL SUPPLY TO AAVE');

        userList[msg.sender].amount -= _amount;
        userList[msg.sender].collateralAmount += _amount;

        return data;
    }

    function borrowETH(uint256 _ethAmount) external returns (bytes memory) {
        (bool success, bytes memory data) = aaveGateWayAdd.delegatecall(
            abi.encodeWithSignature(
                "borrowETH(address,uint256,uint256,uint16)", aaveLendingPoolAdd, _ethAmount, 1, 0
            )
        );
        require(success, 'FAIL BORROW TO AAVE');

        userList[msg.sender].collateralAmount -= _ethAmount;
        userList[msg.sender].shortAmount += _ethAmount;

        uint daiAmount = _EthToDai(_ethAmount);

        userList[msg.sender].shortDaiAmount = daiAmount;
        userList[msg.sender].commission += commissionFee * daiAmount / 1000;

        return data;
    }

    // Token to DAI / ETH
    // ETH => DAI
    function _EthToDai(uint256 _ethAmount) internal returns (uint) {
        uint daiAmount = _getAmountDai(_ethAmount)[0];
        address[] memory path = new address[](2);
        path[0] = uniSwapRouter.WETH();
        path[1] = depositTokenAdd;
        uint deadline = block.timestamp + 100;

        uint[] memory amounts = uniSwapRouter.swapExactETHForTokens{value : uint(_ethAmount)}(daiAmount, path, address(this), deadline);
        require(amounts[0] != 0, "ETH => DAI FAIL");

        return amounts[0];
    }

    function _getAmountDai(uint256 ethAmount) internal view returns (uint[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniSwapRouter.WETH();
        path[1] = depositTokenAdd;

        return uniSwapRouter.getAmountsOut(ethAmount, path);
    }

    // back
    function shortEnd(address _to) external {
//        require(userList[msg.sender].mainWallet != address(0), "Not Valid User");

        (uint daiAmount, uint ethAmount) = _DaiToETH(userList[msg.sender].shortAmount);

        (bool rResult, bytes memory rData) = _repay(ethAmount);
        require(rResult, "Repay Fail");

        userList[msg.sender].shortAmount = 0;

        (bool wResult, bytes memory wData) = _withdraw(userList[msg.sender].collateralAmount);
        require(wResult, "Withdraw Fail");
        int calcul = int(userList[msg.sender].shortDaiAmount) - int(daiAmount);
        if(calcul < 0) {
            userList[msg.sender].collateralAmount -= uint256(-calcul);
        } else {
            userList[msg.sender].collateralAmount += uint256(calcul);
        }
        userList[msg.sender].shortDaiAmount = 0;
        userList[msg.sender].amount += userList[msg.sender].collateralAmount - userList[msg.sender].commission;
        userList[msg.sender].commission = 0;
    }

    function _repay(uint256 amount) internal returns (bool, bytes memory) {
        (bool success, bytes memory data) = aaveGateWayAdd.call{value : amount, gas : 400000}(
            abi.encodeWithSignature(
                "repayETH(address,uint256,uint256,address)", amount, depositTokenAdd, amount, 1, msg.sender
            )
        );
        require(success, 'FAIL REPAY TO AAVE');

        return (success, data);
    }

    function _withdraw(uint256 amount) internal returns (bool, bytes memory) {
        (bool success, bytes memory data) = aaveLendingPoolAdd.delegatecall{gas : 400000}(
            abi.encodeWithSignature(
                "withdraw(address,uint256,uint256,uint16,address)", depositTokenAdd, amount, 1, 0, msg.sender
            )
        );
        require(success, 'FAIL REPAY TO AAVE');

        return (success, data);
    }

    // DAI to Token / ETH
    // DAI => ETH
    function _DaiToETH(uint256 _ethAmount) internal returns (uint, uint) {
        uint daiAmount = _getEstimatedDAIForETH(_ethAmount)[0];
        address[] memory path = new address[](2);
        path[0] = uniSwapRouter.WETH();
        path[1] = depositTokenAdd;
        uint deadline = block.timestamp + 100;

        uint[] memory amounts = uniSwapRouter.swapExactTokensForETH(daiAmount, _ethAmount, path, address(this), deadline);
        require(amounts[0] != 0, "DAI => ETH FAIL");

        return (daiAmount, amounts[0]);
    }

    function _getEstimatedDAIForETH(uint ethAmount) public view returns (uint[] memory) {
        address[] memory path = new address[](2);
        path[0] = depositTokenAdd;
        path[1] = uniSwapRouter.WETH();

        return uniSwapRouter.getAmountsIn(ethAmount, path);
    }

    // View
    function getUserData(address subWallet) external view returns (string memory) {
        string memory output = "";
        output = string(
            abi.encodePacked(output, "[",
            userList[subWallet].mainWallet,
            userList[subWallet].amount,
            userList[subWallet].collateralAmount,
            userList[subWallet].shortDaiAmount,
            userList[subWallet].shortAmount,
            userList[subWallet].commission));

        return output;
    }

    // Owner Functions
    function approveTo(address _token, address _to, uint _amount) external onlyOwner {
        (bool success, bytes memory data) = _token.call{gas : 400000}(
            abi.encodeWithSignature(
                "approve(address,uint)", _to, _amount
            )
        );
    }

    //    function addShortToken(address _tokenAddress) external onlyOwner {
    //        shortTokenAddList[_tokenAddress] = 0;
    //    }

    function setCommissionFee(uint256 fee) external onlyOwner {
        commissionFee = fee;
    }

    function setUniSwapAdd(address newAdd) external onlyOwner {
        uniSwapRouter = UniswapV2Router02(newAdd);
    }

    function setAaveLendingAdd(address newAdd) external onlyOwner {
        aaveLendingPoolAdd = newAdd;
    }

    function setAaveGateWayAdd(address newAdd) external onlyOwner {
        aaveGateWayAdd = newAdd;
    }

    function setDepositTokenAdd(address newAdd) external onlyOwner {
        depositTokenAdd = newAdd;
    }
    //
    //    function approveToAave(uint256 amount) external onlyOwner {
    //        IERC20(depositTokenAdd).approve(aaveLendingPoolAdd, amount);
    //    }
}
