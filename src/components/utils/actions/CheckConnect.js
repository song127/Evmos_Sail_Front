import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {useEffect} from "react";
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

    const isConnected = async () => {
        await dispatch(await connect());
        if (auth) {
            dispatch({type: DATA_TYPES.HEADER, data: true});
            moveToShort();
        } else {
            if(window.location.href.split('/').pop() !== 'Connect') {
                navigate('/Connect');
                resetData();
            }
        }
    }

    useEffect(async () => {
        await isConnected()
    }, [auth, location]);

    return null;
}

export default CheckConnect;