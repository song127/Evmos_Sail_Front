import Factory from '../datas/contracts/SubWalletFactory.json';
import SubWallet from '../datas/contracts/SubWallet.json';
import UniSwap from "../datas/contracts/UniswapV2Router.json";
import {AavePoolAbi, TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";

class ConnectorProvider {
    factoryConnector = (blockchain) => {
        const web3 = blockchain.web3;

        const abi = Factory.abi;
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
        const abi = TokenAbi;
        const tokenContractObj = new web3.eth.Contract(
            abi,
            TokenAddress.DAI
        );

        return tokenContractObj;
    }

    uniSwapConnector = (blockchain) => {
        const web3 = blockchain.web3;

        const abi = UniSwap.abi;
        const ContractObj = new web3.eth.Contract(
            abi,
            TokenAddress.UNI_SWAP
        );

        return ContractObj;
    }

    aaveETHConnector = () => {

    }

    aaveConnector = (blockchain) => {
        const web3 = blockchain.web3;

        const abi = AavePoolAbi;
        const Contract = new web3.eth.Contract(
            abi,
            TokenAddress.AAVE_LENDING_POOL
        );

        return Contract;
    }
}

export default ConnectorProvider;