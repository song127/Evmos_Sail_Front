import {WALLET_ERRORS} from "../../network/errors/WalletErrors";

export const BLOCK_ACTION_TYPES = {
    CONNECTION_REQUEST: 'CONNECTION_REQUEST',
    CONNECTION_SUCCESS: 'CONNECTION_SUCCESS',
    CONNECTION_FAILED: 'CONNECTION_FAILED',
    UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
    SET_SUB_WALLET: 'SET_SUB_WALLET',
    BLOCK_RESET: 'BLOCK_RESET',
};

const initialState = {
    loading: false,
    account: null,
    subWallet: null,
    smartContract: null,
    web3: null,
    error: -1,
};

const blockchainReducer = (state = initialState, action) => {
    let resultState = {...state};

    switch (action.type) {
        case BLOCK_ACTION_TYPES.CONNECTION_REQUEST:
            resultState.error = -1;
            resultState.loading = true;
            break;
        case BLOCK_ACTION_TYPES.CONNECTION_SUCCESS:
            resultState.loading = false;
            resultState.account = action.payload.account;
            resultState.smartContract = action.payload.smartContract;
            resultState.web3 = action.payload.web3;
            resultState.error = -1;
            break;
        case BLOCK_ACTION_TYPES.CONNECTION_FAILED:
            resultState.loading = false;
            resultState.error = action.payload;
            break;
        case BLOCK_ACTION_TYPES.UPDATE_ACCOUNT:
            resultState.account = action.payload.account;
            break;
        case BLOCK_ACTION_TYPES.SET_SUB_WALLET:
            resultState.subWallet = action.data;
            break;
        case BLOCK_ACTION_TYPES.BLOCK_RESET:
            resultState = initialState;
            resultState.error = -2;
        default:
    }

    return resultState;
};

export default blockchainReducer;
