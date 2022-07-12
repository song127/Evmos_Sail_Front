import {post} from "./AxiosCreate";
import 'url-search-params-polyfill';
import {TokenAbi} from "../redux/blockchain/TokenAbi";
import {TokenAddress} from "../redux/blockchain/Address";
import SmartContract from "../contracts/SmartContract.json";
const BigNumber = require('bignumber.js');

const GET_SUB_WALLET = 'wallet/subWallet';

const SHORT_START = 'position/start';
const SHORT_END = 'position/end';

const DEPOSIT = ''; // contract
const WITHDRAW = 'position/withdraw';

const SEND_GAS_FEE = ''; // contract

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
        )

        return true;
    }

    withdrawW = async (blockchain, amount) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const smart = blockchain.smartContract;

        const user_id = localStorage.getItem('user_id');
        const wallet_id = localStorage.getItem('wallet_id');
        const subWallet = localStorage.getItem('subWallet');

        let gasFee = 0;
        gasFee += await smart.methods.withdrawToken(0, account).estimateGas(
            {from: account},
            function (err, value) {
                if(err) throw err;
            }
        );

        const sendGasFee = await this.sendGasFee(web3, account, gasFee);

        if(sendGasFee) {
            const res = await post(WITHDRAW, {
                user_id,
                wallet_id,
                walletAddress: subWallet,
                withdraw: amount,
                gasFee
            });

            const data = res.data;

            return data.error === 1;
        } else {
            return false;
        }
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

        let gasFee = 2000000000000000;

        console.log(`{
            ${user_id},
            ${token},
            ${wallet_id},
            ${collateral},
            ${short},
            ${gasFee}
        }`);

        const res = await post(SHORT_START, {
            user_id,
            token,
            wallet_id,
            collateral,
            short,
            gasFee
        });
        const data = res.data;
        console.log(data.error);

        return data.error === 1;
    }

    shortEndW = async (blockchain) => {
        const smart = blockchain.smartContract;
        const account = blockchain.account;
        const web3 = blockchain.web3;

        const user_id = localStorage.getItem('user_id');
        const wallet_id = localStorage.getItem('user_id');
        const subWallet = localStorage.getItem('subWallet');

        let gasFee = 2000000000000000;

        // await smart.methods.shortEnd(account).estimateGas(
        //     {from: account},
        //     function (err, value) {
        //         if(err) throw err;
        //         gasFee += value;
        //     }
        // );

        const sendGasFee = await this.sendGasFee(web3, account, gasFee);

        if(sendGasFee) {
            const res = await post(SHORT_END, {
                user_id,
                wallet_id,
                walletAddress: subWallet,
                gasFee,
            });

            const data = res.data;

            return data.error === 1;
        } else {
            return false;
        }
    }

    sendGasFee = async (web3, account, gasFee) => {
        const subWallet = localStorage.getItem('subWallet');

        web3.eth.sendTransaction({
            from: account,
            to: subWallet,
            value: gasFee,
            gasLimit: 2100000,
        }, (error, hash) => {
            if(error) throw error;
        });

        return true;
    }

    getMyDaiBalance = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        // const test = web3.eth.accounts.privateKeyToAccount('0x9aa8027335b9b4793d23464dd2abf03d9a9946011ff2a7710d90949272948d50');
        //
        // console.log('-----------------------------');
        // console.log(account);
        // console.log(test.address);
        // console.log('-----------------------------');
        const tokenAbi = TokenAbi;

        // Create contract object
        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );
        //
        // const wei = web3.utils.toWei((1000).toString(), 'mwei');
        // const amount = new BigNumber(wei);
        //
        // const tx = blockchain.smartContract.methods.setCommissionFee(1);
        // await tx.wait();
        // const gas = await tx.estimateGas({from: test.address});
        // console.log('-----------------------------');
        // console.log(gas);

        const balance = await tokenContractObj.methods.balanceOf(account).call(
            {from: account},
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));

        return result;
    }
}

export default ActionsAPI;