import Web3 from "web3";
import SmartContract from "../../contracts/SmartContract.json";
import {BLOCK_ACTION_TYPES} from "./blockchainReducer";

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

const connectFailed = (payload) => {
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
        console.log('connect wallet');
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        const NetworkData = await SmartContract.networks[networkId];
        if (NetworkData) {
          const SmartContractObj = new web3.eth.Contract(
              SmartContract.abi,
              NetworkData.address
          );
          dispatch(
              connectSuccess({
                account: accounts[0],
                smartContract: SmartContractObj,
                web3: web3,
              })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Ethereum."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateDatas = async () => {
  return async (dispatch) => {
    console.log('reconnect');
    let web3 = new Web3(window.ethereum);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    const NetworkData = await SmartContract.networks[networkId];
    if (NetworkData) {
      const SmartContractObj = new web3.eth.Contract(
          SmartContract.abi,
          NetworkData.address
      );
      dispatch(
          connectSuccess({
            account: accounts[0],
            smartContract: SmartContractObj,
            web3: web3,
          })
      );
      // Add listeners start
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(updateAccount(accounts[0]));
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } else {
      dispatch(connectFailed("Change network to Ethereum."));
    }
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
  };
};
