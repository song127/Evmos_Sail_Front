// Get Datas
import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";
import ConnectorProvider from "./ConnectorProvider";
import SubWallet from "../datas/contracts/SubWallet.json";

class DataApi {
    getTest = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await new DataApi().getSubWallet(blockchain)

        const contract = await new ConnectorProvider().walletConnector(blockchain, sub);

        const v = web3.utils.toHex(web3.utils.toWei('0.00001'));

        // await contract.methods.tokenToEth(TokenAddress.DAI, v).send(
        //     {from: account, gas: 500000}
        // )

        const value = await contract.methods.getShort(sub).call(
            {from: account}
        );

        console.log(value);
    }

    getSubWallet = async (blockchain) => {
        const connector = new ConnectorProvider().factoryConnector(blockchain);

        const wallets = await connector.methods.getWallets(blockchain.account).call(
            {from: blockchain.account},
            (err, hs) => {
                if (err) throw err;
            }
        );

        if (wallets.length == 0) {
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
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));

        setTimeout(() => {
        }, 1000);

        return result;
    }

    getDepositDaiBalance = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await this.getSubWallet(blockchain);
        console.log(sub);
        const tokenAbi = TokenAbi;

        // Create contract object
        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        const balance = await tokenContractObj.methods.balanceOf(sub).call(
            {from: account},
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));

        setTimeout(() => {
        }, 1000);

        return result;
    }

    isApprovedToken = async (blockchain) => {
        const web3 = blockchain.web3;
        const sub = await this.getSubWallet(blockchain);
        const account = blockchain.account;

        const contract = await new ConnectorProvider().tokenConnector(web3);

        // set address
        const networkId = await window.ethereum.request({
            method: "net_version",
        });

        const balance = await contract.methods.allowance(
            account,
            sub
        ).call(
            {from: account},
            function (error, txnHash) {
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
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = balance / web3.utils.toBN(10).pow(web3.utils.toBN(18));
        console.log('ETH : ' + result);

        return result > 20000;
    }

    isApprovedAavePool = async (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;
        const sub = await this.getSubWallet(blockchain);
        const tokenAbi = TokenAbi;

        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        const balance = await tokenContractObj.methods.allowance(sub, TokenAddress.AAVE_LENDING_POOL).call(
            {from: account},
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = parseInt(balance);

        console.log('Pool : ' + result);

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
            function (error, txnHash) {
                if (error) throw error;
            }
        );
        const result = parseInt(balance);
        console.log('Uni : ' + result);

        return result > 20000;
    }
}

export default DataApi;