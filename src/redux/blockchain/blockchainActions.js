import Web3 from "web3";
import SmartContract from "../../datas/contracts/SubWallet.json";
import {BLOCK_ACTION_TYPES} from "./blockchainReducer";
import {DATA_TYPES} from "../data/dataReducer";
import {WALLET_ERRORS} from "../../network/errors/WalletErrors";

const connectRequest = () => {
    return {
        type: BLOCK_ACTION_TYPES.CONNECTION_REQUEST,
    };
};

const connectSuccess = (payload) => {
    return {
        type: BLOCK_ACTION_TYPES.CONNECTION_SUCCESS,
        payload: payload,
    };
};

export const connectFailed = (payload) => {
    return {
        type: BLOCK_ACTION_TYPES.CONNECTION_FAILED,
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: BLOCK_ACTION_TYPES.UPDATE_ACCOUNT,
        payload: payload,
    };
};

export const connect = async () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        if (window.ethereum) {
            let web3 = new Web3(window.ethereum);
            try {
                const networkId = await window.ethereum.request({
                    method: "net_version",
                });
                if(networkId == 42 || networkId == 5) {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    const NetworkData = await SmartContract.networks[networkId];
                    if (NetworkData) {
                        const SmartContractObj = new web3.eth.Contract(
                            SmartContract.abi,
                            NetworkData.address
                        );

                        await dispatch(
                            connectSuccess({
                                account: accounts[0],
                                smartContract: SmartContractObj,
                                web3: web3,
                            })
                        );

                        // Add listeners start
                        window.ethereum.on("accountsChanged", (accounts) => {
                            console.log('Accounts :');
                            console.log(accounts);
                            dispatch({type: BLOCK_ACTION_TYPES.BLOCK_RESET});
                            localStorage.removeItem(DATA_TYPES.AUTH);
                            window.location.reload();
                        });
                        window.ethereum.on("chainChanged", async () => {
                            const networkId = await window.ethereum.request({
                                method: "net_version",
                            });
                            if(networkId !== 42 || networkId !== 5) {
                                localStorage.removeItem(DATA_TYPES.AUTH);
                            }
                            window.location.reload();
                        });

                        return {
                            account: accounts[0],
                            smartContract: SmartContractObj,
                            web3: web3,
                        };
                        // Add listeners end
                    } else {
                        dispatch(connectFailed(WALLET_ERRORS.NONE_CONTRACT));
                    }
                } else {
                    dispatch(connectFailed(WALLET_ERRORS.DIFF_NET));
                }
            } catch (err) {
                dispatch(connectFailed(WALLET_ERRORS.REJECTED));
            }
        } else {
            dispatch(connectFailed(WALLET_ERRORS.NOT_INSTALL));
        }
    };
};

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({account: account}));
    };
};
