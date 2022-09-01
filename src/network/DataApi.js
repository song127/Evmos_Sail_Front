// Get Datas
import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";
import ConnectorProvider from "./ConnectorProvider";
import Web3 from "web3";
import {LOG} from "../styles/utils";

const web3G = new Web3();

class DataApi {
    // Wallet Data
    //--------------------------------------------------------------------------------------
    getSubWallet = async (blockchain) => {
        const connector = new ConnectorProvider().factoryConnector(blockchain);

        const wallets = await connector.methods.getWallets(blockchain.account).call(
            {from: blockchain.account},
            (err,) => {
                if (err) throw err;
            }
        );

        if (wallets.length === 0) {
            return 'false';
        }

        return wallets[0];
    }

    getMyDaiBalance = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const tokenAbi = TokenAbi;

        // Create contract object
        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        const balance = await tokenContractObj.methods.balanceOf(account).call(
            {from: account},
            function (error,) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));

        return result;
    }

    getDepositDaiBalance = async (blockchain) => {
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const balance = await contract.methods.balance().call();

        const result = balance / web3G.utils.toBN(10).pow(web3G.utils.toBN(18));

        return result;
    }

    isApprovedToken = async (blockchain) => {
        const web3 = blockchain.web3;
        const sub = await this.getSubWallet(blockchain);
        const account = blockchain.account;

        const contract = await new ConnectorProvider().tokenConnector(web3);

        const balance = await contract.methods.allowance(
            account,
            sub
        ).call(
            {from: account},
            function (error,) {
                if (error) throw error;
            });

        if (parseInt(balance) > 100000) {
            return true;
        }

        return false;
    }

    isApprovedBorrowEth = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await this.getSubWallet(blockchain);
        const tokenAbi = TokenAbi;

        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.AAVE_ETH_ALLOW
        );

        const balance = await tokenContractObj.methods.borrowAllowance(sub, TokenAddress.AAVE_GATEWAY).call(
            {from: account},
            function (error,) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));

        return result > 20000;
    }

    isApprovedAavePool = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await this.getSubWallet(blockchain);
        if (sub === 'false') {
            return false;
        }
        const tokenAbi = TokenAbi;

        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        const balance = await tokenContractObj.methods.allowance(sub, TokenAddress.AAVE_LENDING_POOL).call(
            {from: account},
            function (error,) {
                if (error) throw error;
            }
        );
        const result = parseInt(balance);

        return result > 20000;
    }

    isApprovedUniSwap = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await this.getSubWallet(blockchain);
        const tokenAbi = TokenAbi;

        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        const balance = await tokenContractObj.methods.allowance(sub, TokenAddress.UNI_SWAP).call(
            {from: account},
            function (error,) {
                if (error) throw error;
            }
        );
        const result = parseInt(balance);

        return result > 20000;
    }

    getShortData = async (blockchain) => {
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)
        LOG(sub);

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = await contract.methods.getShort(sub).call();

        return value;
    }

    getCollateralData = async (blockchain) => {
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = await contract.methods.getCollateral(TokenAddress.DAI).call();
        const result = value / web3G.utils.toBN(10).pow(web3G.utils.toBN(18));

        return result;
    }

    getTotalProfit = async (block) => {
        const sub = await new DataApi().getSubWallet(block);

        const contract = await new ConnectorProvider().walletConnector(block, sub);

        const value = await contract.methods.totalProfit().call();
        const result = value / web3G.utils.toBN(10).pow(web3G.utils.toBN(18));

        return result;
    }

    // External Data
    //--------------------------------------------------------------------------------------
    getHealth = async (blockchain) => {
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain);
        const contract = await new ConnectorProvider().aaveConnector(blockchain);

        const value = await contract.methods.getUserAccountData(sub).call();

        return value;
    }

    getWEthPath = async (blockchain) => {
        const account = blockchain.account;
        const contract = await new ConnectorProvider().uniSwapConnector(blockchain);

        const value = await contract.methods.WETH().call();

        return value;
    }

    getApyETH = async (block) => {
        const contract = await new ConnectorProvider().aaveConnector(block);
        const wEthPath = await this.getWEthPath(block);

        const reserveDataETH = await contract.methods.getReserveData(wEthPath).call();
        const curBorrowRate = reserveDataETH['currentVariableBorrowRate'];
        LOG(curBorrowRate);

        const ray = 10**27;
        const SECONDS_PER_YEAR = 31536000;

        const varBorrowAPR = curBorrowRate / ray;
        const varBorrowAPY = ((1 + (varBorrowAPR / SECONDS_PER_YEAR))**SECONDS_PER_YEAR) - 1;

        return varBorrowAPY * 100;
    }

    getDaiEthRate = async (blockchain, mode) => { // 0: DAI > ETH // 1: ETH > DAI
        const account = blockchain.account;
        const contract = await new ConnectorProvider().uniSwapConnector(blockchain);
        const wEthPath = await this.getWEthPath(blockchain);

        const amount = web3G.utils.toHex(web3G.utils.toWei('1'));
        let value;
        if (mode === 0) {
            const path = [TokenAddress.DAI, wEthPath];
            value = await contract.methods.getAmountsOut(amount, path).call(
                {from: account}
            );
        } else {
            const path = [wEthPath, TokenAddress.DAI];
            value = await contract.methods.getAmountsOut(amount, path).call(
                {from: account}
            );
        }

        const result = value[1] / web3G.utils.toBN(10).pow(web3G.utils.toBN(18));

        return result;
    }

    getTokensRate = async (token1, token2, blockchain) => {
        const account = blockchain.account;
        const contract = await new ConnectorProvider().uniSwapConnector(blockchain);

        const value = await contract.methods.getAmountsOut().call(
            {from: account}
        );

        const result = value / web3G.utils.toBN(10).pow(web3G.utils.toBN(18));

        return result;
    }

    // Util
    toFixed = (x) => {
        if (Math.abs(x) < 1.0) {
            let e = parseInt(x.toString().split('e-')[1]);
            if (e) {
                x *= Math.pow(10, e - 1);
                x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
            }
        } else {
            let e = parseInt(x.toString().split('+')[1]);
            if (e > 20) {
                e -= 20;
                x /= Math.pow(10, e);
                x += (new Array(e + 1)).join('0');
            }
        }
        return x;
    }
}

export default DataApi;