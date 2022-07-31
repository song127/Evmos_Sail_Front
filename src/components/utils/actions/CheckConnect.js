import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {useEffect, useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {connect} from "../../../redux/blockchain/blockchainActions";
import {BLOCK_ACTION_TYPES} from "../../../redux/blockchain/blockchainReducer";

function CheckConnect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blockchain = useSelector(state => state.blockchain);
    const auth = localStorage.getItem(DATA_TYPES.AUTH);
    const {location} = useLocation();

    const resetData = () => {
        dispatch({type: DATA_TYPES.HEADER, data: false});
        dispatch({type: DATA_TYPES.MENU, data: 'short'});
        dispatch({type: DATA_TYPES.TAB, data: 0});
    }

    const moveToShort = () => {
        if (window.location.href.split('/').pop() === ''
            || window.location.href.split('/').pop() === 'Connect') {
            dispatch({type: DATA_TYPES.HEADER, data: true});
            dispatch({type: DATA_TYPES.MENU, data: 'short'});
            dispatch({type: DATA_TYPES.TAB, data: 0});
            navigate('/Short');
        }
    }

    const checkConnected = async () => {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        if (accounts && accounts.length > 0) {
        } else {
            resetData();
            dispatch({type: BLOCK_ACTION_TYPES.BLOCK_RESET});
            localStorage.removeItem(DATA_TYPES.AUTH);
        }
    }

    const isConnected = async () => {
        if(auth) {
            dispatch({type: DATA_TYPES.HEADER, data: true});
            await dispatch(await connect());
            moveToShort();
        } else {
            resetData();
            navigate('/Connect');
        }
    }

    useEffect(async () => {
        await isConnected();
    }, [auth, location]);

    useEffect(async () => {
        await checkConnected();
    }, [blockchain.account]);

    return null;
}

export default CheckConnect;