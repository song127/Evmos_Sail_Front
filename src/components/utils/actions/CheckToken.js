import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {useEffect, useLayoutEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {connect, updateDatas} from "../../../redux/blockchain/blockchainActions";
import AuthAPI from "../../../api/AuthAPI";

function CheckToken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.data.auth);
    const {location} = useLocation();
    const authApi = new AuthAPI();

    const resetData = () => {
        dispatch({type: DATA_TYPES.HEADER, data: false});
        dispatch({type: DATA_TYPES.AUTH, data: false});
        dispatch({type: DATA_TYPES.MENU, data: ''});
    }

    const isSignIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const isValidToken = await authApi.checkToken();
            if (isValidToken) {
                dispatch({type: DATA_TYPES.HEADER, data: true});
                if(window.location.href.split('/').pop() === '') {
                    navigate('/short');
                }
            } else {
                authApi.logout().then(() => {
                    resetData();
                    navigate('/');
                });
            }
            await dispatch(await updateDatas());
        } else {
            authApi.logout().then(() => {
                resetData();
                navigate('/');
            });
        }
    }

    useEffect(async () => {
        await isSignIn();
    }, [auth, location]);

    return null;
}

export default CheckToken;