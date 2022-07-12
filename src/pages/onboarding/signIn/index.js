import styled, {keyframes} from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import SquareBtn from "../../../components/global/SquareBtn";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import Input from "../../../components/global/Input";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {useNavigate} from "react-router-dom";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";
import {connect} from "../../../redux/blockchain/blockchainActions";
import AuthAPI from "../../../api/AuthAPI";
import ActionsAPI from "../../../api/ActionsAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  background-color: ${c.white};

  width: 100vmax;
  height: 100vh;

  animation: ${ContentLoaded} 1.4s;
  animation-fill-mode: forwards;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 100%;
  max-width: 520px;
  height: max-content;
`;

const CommonText = styled.text`
  font-size: 14px;
`;

const MoveText = styled.div`
  cursor: pointer;

  font-size: 14px;
  color: ${c.blue_2};
`;

function SignInPage() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const authApi = new AuthAPI();

    const blockchain = useSelector(state => state.blockchain);

    const [emailInput, setEmailInput] = useState('');
    const emailChanged = (e) => {
        setEmailInput(e.target.value);
    }

    const [passInput, setPassInput] = useState('');
    const passChanged = (e) => {
        setPassInput(e.target.value);
    }

    const login = async () => {
        await dispatch(await connect());

        await authApi.logout();
        if(!localStorage.getItem('token')) {
            try {
                await authApi.login(emailInput, passInput).then((result) => {
                    if(result) {
                        dispatch({type: DATA_TYPES.AUTH, data: true});
                        alert('Login Success!');
                    }  else {
                        alert('Login Failed!');
                    }
                });
            } catch (e) {
                alert('Login Failed!');
            }
        }
    }

    return (
        <Container>
            <Inner>
                <SizeBox h={180}/>
                <div className={'h3'}>
                    Login
                </div>

                <SizeBox h={40}/>
                <SizeBox h={60} w={'100%'}>
                    <Input input={emailInput} onChange={emailChanged} holder={'example@gmail.com'}/>
                </SizeBox>

                <SizeBox h={30}/>
                <SizeBox h={60} w={'100%'}>
                    <Input input={passInput} onChange={passChanged} holder={'Password'}/>
                </SizeBox>


                <SizeBox h={80}/>
                <SizeBox h={60} w={'100%'}>
                    <SquareBtn type={0} active={true} onClick={login}>
                        Login
                    </SquareBtn>
                </SizeBox>

                <SizeBox h={74}/>
                <CommonText>
                    If you don't have an account, try to sign up:
                </CommonText>

                <SizeBox h={10}/>
                <MoveText onClick={() => navigator('/SignUp')}>
                    Sign Up
                </MoveText>

                <SizeBox h={30}/>
                <CommonText>
                    If you forgot the password:
                </CommonText>

                <SizeBox h={10}/>
                <MoveText onClick={() => navigator('/ResetPass')}>
                    Reset the password
                </MoveText>
            </Inner>
        </Container>
    );
}

export default SignInPage;