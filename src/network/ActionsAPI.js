import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";
import SubWallet from "../datas/contracts/SubWallet.json";
import ConnectorProvider from "./ConnectorProvider";
import DataApi from "./DataApi";

// Contract Actions
class ActionsAPI {
    createWallet = async (blockchain) => {
        const contract = new ConnectorProvider().factoryConnector(blockchain);

        let result = true;
        await contract.methods.wallet().send(
            {from: blockchain.account, gas: 400000},
            function (err, tx) {
                if (err) throw err;
            }
        );

        return result;
    }

    approveToken = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;

        const contract = await new ConnectorProvider().tokenConnector(web3);

        const toAddress = await new DataApi().getSubWallet(blockchain);

        // Calculate contract compatible value for approve with proper decimal points using BigNumber
        const tokenDecimals = web3.utils.toBN(18);
        const tokenAmountToApprove = web3.utils.toBN(99900000);
        const calculatedApproveValue = web3.utils.toHex(tokenAmountToApprove.mul(web3.utils.toBN(10).pow(tokenDecimals)));

        let result = true;
        await contract.methods.approve(
            toAddress,
            calculatedApproveValue
        ).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }

    withdrawW = async (blockchain, amount) => {
        const account = blockchain.account;
        const web3 = blockchain.web3;
        const sub = await new DataApi().getSubWallet(blockchain);

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = web3.utils.toHex(web3.utils.toWei(amount));

        let result = true;
        await contract.methods.withdrawToken(TokenAddress.DAI, value).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;

        return true;
    }

    depositW = async (blockchain, amount) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const subWallet = await new DataApi().getSubWallet(blockchain);

        const contract = await new ConnectorProvider().walletConnector(blockchain, subWallet);

        const value = web3.utils.toHex(web3.utils.toWei(amount));

        let result = true;
        await contract.methods.depositToken(TokenAddress.DAI, value).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }

    approveTokenAave = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = web3.utils.toHex(web3.utils.toWei("2000000000"));

        let result = true;
        await contract.methods.approveTo(TokenAddress.DAI, TokenAddress.AAVE_LENDING_POOL, value).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }

    approveTokenUniSwap = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = web3.utils.toHex(web3.utils.toWei("200000000000"));

        let result = true;
        await contract.methods.approveTo(TokenAddress.DAI, TokenAddress.UNI_SWAP, value).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }

    approveBorrowEth = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const value = web3.utils.toHex("115792089237316195423570985008687907853269984665640564039457584007913129639935");

        let result = true;
        await contract.methods.approveEth(TokenAddress.AAVE_GATEWAY, value).send(
            {from: account, gas: 400000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;

    }

    shortStartW = async (blockchain, collateral, short) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const hexCollateral = web3.utils.toHex(web3.utils.toWei(collateral));
        const hexShort = web3.utils.toHex(web3.utils.toWei(short));
        console.log(hexCollateral);
        console.log(hexShort);

        let result = true;
        await contract.methods.shortStartETH(TokenAddress.DAI, hexCollateral, hexShort).send(
            {from: account, gas: 20000000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }

    shortEndW = async (blockchain) => {
        const account = blockchain.account;
        const web3 = blockchain.web3;

        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        let result = true;
        await contract.methods.shortEndETH().send(
            {from: account, gas: 20000000},
            function (err, tx) {
                if (err) result = false;
            }
        );

        return result;
    }
}

export default ActionsAPI;