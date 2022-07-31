
// Get Datas
import {TokenAbi} from "../datas/TokenAbi";
import {TokenAddress} from "../datas/Address";

class DataApi {
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

        return result;
    }
}

export default DataApi;