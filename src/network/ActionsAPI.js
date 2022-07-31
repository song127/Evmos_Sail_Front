import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";
import SmartContract from "../datas/contracts/SmartContract.json";

// Contract Actions
class ActionsAPI {
    approveToken = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;

        // Get the contract ABI from compiled smart contract json
        const tokenAbi = TokenAbi;
        // Create contract object
        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        // set address
        const networkId = await window.ethereum.request({
            method: "net_version",
        });
        const toAddress = await SmartContract.networks[networkId].address;

        // Calculate contract compatible value for approve with proper decimal points using BigNumber
        const tokenDecimals = web3.utils.toBN(18);
        const tokenAmountToApprove = web3.utils.toBN(999000000000);
        const calculatedApproveValue = web3.utils.toHex(tokenAmountToApprove.mul(web3.utils.toBN(10).pow(tokenDecimals)));

        const balance = await tokenContractObj.methods.allowance(
            account,
            toAddress
        ).call(
            {from: account},
            function (error, txnHash) {
                if (error) throw error;
                console.log('YOUR TX');
                console.log(txnHash);
            });

        if (parseInt(balance) > 100000) {
            return 0;
        }

        await tokenContractObj.methods.approve(
            toAddress,
            calculatedApproveValue
        ).send(
            {from: account},
            function (error, txnHash) {
                if (error) throw error;
                console.log('YOUR TX');
                console.log(txnHash);
            });

        return 1;
    }

    depositW = async (blockchain, amount) => {
        const smart = blockchain.smartContract;
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const subWallet = localStorage.getItem('subWallet');

        const decimal = web3.utils.toBN(18);

        const amountBN = web3.utils.toBN(amount);
        const value = web3.utils.toHex(amountBN.mul(web3.utils.toBN(10).pow(decimal)));

        await smart.methods.depositToken(subWallet, value).send(
            {from: account},
            function (err, tx) {
                if(err) throw err;
            }
        );

        return true;
    }

    withdrawW = async (blockchain, amount) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const smart = blockchain.smartContract;

        const user_id = localStorage.getItem('user_id');
        const wallet_id = localStorage.getItem('wallet_id');
        const subWallet = localStorage.getItem('subWallet');
    }

    shortStartW = async (blockchain, collateral, short) => {
        collateral = parseFloat(collateral);
        short = parseFloat(short);

        const smart = blockchain.smartContract;
        const web3 = blockchain.web3;
        const account = blockchain.account;

        const user_id = parseInt(localStorage.getItem('user_id'));
        const wallet_id = parseInt(localStorage.getItem('wallet_id'));
        const token = localStorage.getItem('token');

        return true;
    }

    shortEndW = async (blockchain) => {
        const smart = blockchain.smartContract;
        const account = blockchain.account;
        const web3 = blockchain.web3;

        const user_id = localStorage.getItem('user_id');
        const wallet_id = localStorage.getItem('user_id');
        const subWallet = localStorage.getItem('subWallet');
    }
}

export default ActionsAPI;