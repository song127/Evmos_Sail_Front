import Factory from '../datas/contracts/SubWalletFactory.json';
import SubWallet from '../datas/contracts/SubWallet.json';
import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";

class ConnectorProvider {
    factoryConnector = (blockchain) => {
        const web3 = blockchain.web3;
        const account = blockchain.account;

        const abi = Factory.abi;
        // Create contract object
        const ContractObj = new web3.eth.Contract(
            abi,
            Factory.networks["42"].address
        );

        return ContractObj;
    }

    walletConnector = (blockchain, sub) => {
        const web3 = blockchain.web3;

        const abi = SubWallet.abi;
        const ContractObj = new web3.eth.Contract(
            abi,
            sub
        );

        return ContractObj;
    }

    tokenConnector = (web3) => {
        // Get the contract ABI from compiled smart contract json
        const tokenAbi = TokenAbi;
        // Create contract object
        const tokenContractObj = new web3.eth.Contract(
            tokenAbi,
            TokenAddress.DAI
        );

        return tokenContractObj;
    }

    aaveETHConnector = () => {

    }

    aaveConnector = () => {

    }
}

export default ConnectorProvider;