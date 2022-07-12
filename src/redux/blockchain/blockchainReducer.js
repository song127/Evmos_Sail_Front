export const BLOCK_ACTION_TYPES = {
    CONNECTION_REQUEST: 'CONNECTION_REQUEST',
    CONNECTION_SUCCESS: 'CONNECTION_SUCCESS',
    CONNECTION_FAILED: 'CONNECTION_FAILED',
    UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
};

const initialState = {
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
    let resultState = {...state};

    switch (action.type) {
        case BLOCK_ACTION_TYPES.CONNECTION_REQUEST:
            resultState.loading = true;
            break;
        case BLOCK_ACTION_TYPES.CONNECTION_SUCCESS:
            resultState.loading = false;
            resultState.account = action.payload.account;
            resultState.smartContract = action.payload.smartContract;
            resultState.web3 = action.payload.web3;
            break;
        case BLOCK_ACTION_TYPES.CONNECTION_FAILED:
            resultState.loading = false;
            resultState.errorMsg = action.payload.errorMsg;
            break;
        case BLOCK_ACTION_TYPES.UPDATE_ACCOUNT:
            resultState.account = action.payload.account;
            break;
        default:
    }

    return resultState;
};

export default blockchainReducer;
