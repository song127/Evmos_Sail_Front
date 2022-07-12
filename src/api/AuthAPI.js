import {post} from "./AxiosCreate";
import 'url-search-params-polyfill';
import {useSelector} from "react-redux";

const TOKEN_CHECK = 'session_test';

const LOGIN = 'login';

const EMAIL_DUP_CHECK = 'account/check/email_duplication';
const EMAIL_SEND = '';
const EMAIL_CODE_CHECK = 'account/confirm/email/sign_up';

const SIGN_UP = 'account/sign_up';

const RESET_PASS_EMAIL_CODE_CHECK = 'account/confirm/email/change_password';
const RESET_PASS = 'account/request/change_password';

const LOGOUT = '';

class AuthAPI {
    checkToken = async () => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        const res = await post(TOKEN_CHECK, {
            user_id,
            token
        })

        return res.data === 'OK';
    }

    checkEmailDuplicate = async (email) => {
        const res = await post(EMAIL_DUP_CHECK, {
            email
        });
        const data = res.data;

        return data.error === 1;
    }

    sendEmail = async (email) => {
        const res = await post(EMAIL_SEND);
    }

    checkEmailCode = async (code) => {
        const res = await post(EMAIL_CODE_CHECK);
    }

    signUp = async (email, password) => {
        const res = await post(SIGN_UP, {
            email,
            password
        });
        const data = res.data;

        return data.error === 1;
    }

    checkResetPassEmailCode = async (code) => {
        const res = await post(RESET_PASS_EMAIL_CODE_CHECK);
    }

    resetPass = async (email, password) => {
        const res = await post(RESET_PASS, {
            email,
            password
        });

        return res.data.error === 1;
    }

    login = async (email, password) => {
        console.log(email);
        console.log(password);
        const res = await post(LOGIN, {
            email,
            password
        });
        const data = res.data.data;

        const token = data.token;
        if (token !== null && token !== undefined) {
            localStorage.setItem('token', token);
            localStorage.setItem('email', data.user_info.email);
            localStorage.setItem('user_id', data.user_info.id);
            localStorage.setItem('wallet_id', data.wallet_list[0].id);
            localStorage.setItem('subWallet', data.wallet_list[0].address);
            return true;
        }

        return false;
    }

    logout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        localStorage.removeItem('wallet_id');
        localStorage.removeItem('subWallet');
    }
}

export default AuthAPI;