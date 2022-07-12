import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import Input, {BORDER_STATE} from "../../../components/global/Input";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import SquareBtn from "../../../components/global/SquareBtn";
import ColorBox, {COLOR_BOX_TYPES} from "../../../components/global/ColorBox";
import {useNavigate} from "react-router-dom";
import AuthAPI from "../../../api/AuthAPI";
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  background-color: ${c.white};

  width: 100vmax;
  height: max-content;

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

const HelpMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: start;

  width: 100%;
  height: 24px;

  color: ${props => props.color};
  font-size: 13px;
  font-weight: 500;

  opacity: ${props => props.visible ? 1 : 0.0};

  transition: all 0.4s;
`;

let emailDone = false;
let verifyDone = false;
let passDone = false;
let passConfirmDone = false;
let connectWalletDone = false;

function SignUpPage() {
    const dispatch = useDispatch();
    const blockchain = useSelector(state => state.blockchain);
    const [allDone, setAllDone] = useState(false);
    const navigator = useNavigate();
    const api = new AuthAPI();

    // EMAIL
    const emailRef = useRef(null);
    const [emailState, setEmailState] = useState(BORDER_STATE.DEFAULT);
    const [emailValid, setEmailValid] = useState(false);
    const [emailHelp, setEmailHelp] = useState('');
    const [email, setEmail] = useState('');
    const [emailChecked, setEmailChecked] = useState(false);
    const emailChanged = (e) => {
        setEmail(e.target.value);
        checkEmailValid(e.target.value);
    }
    const checkEmailValid = (text) => {
        const exp = /([\w-.]+)@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/;
        const pattern = new RegExp(exp);
        setEmailValid(true);
        setEmailHelp('');
        setEmailState(BORDER_STATE.FOCUS);

        if (text.match(pattern) === null) {
            setEmailValid(false);
            setEmailHelp('Not valid email');
            setEmailState(BORDER_STATE.ERROR);
        }
    }
    const checkEmail = () => {
        if(emailValid) {
            //TODO: 중복 체크
            let result = true;
            if(result) {
                setEmailChecked(true);
                setEmailHelp('email is valid');
                setEmailState(BORDER_STATE.FOCUS);
            } else {
                setEmailChecked(false);
                setEmailHelp('email is not valid');
                setEmailState(BORDER_STATE.ERROR);
            }
        }
    }
    const sendCode = () => {
        if (emailValid) {
            //TODO: 인증 코드 전송
            emailDone = true;
            if (emailDone) {
                setEmailHelp('Complete');
                setEmailState(BORDER_STATE.COMPLETE);
            } else {
                setEmailHelp('ERROR');
                setEmailState(BORDER_STATE.ERROR);
            }
        }
    }

    // VERIFY
    const verifyRef = useRef(null);
    const [verifyState, setVerifyState] = useState(BORDER_STATE.DEFAULT);
    const [verifyValid, setVerifyValid] = useState(false);
    const [verifyHelp, setVerifyHelp] = useState('');
    const [verify, setVerify] = useState('');
    const verifyChanged = (e) => {
        if (e.target.value.length < 7) {
            setVerify(e.target.value);
            setVerifyValid(e.target.value.length === 6);
        }
    }
    const verifyCode = () => {
        if (verifyValid) {
            //TODO: 인증 코드 인증
            verifyDone = true;
            if (verifyDone) {
                setVerifyHelp('Verify Complete');
                setVerifyState(BORDER_STATE.COMPLETE);
            } else {
                setVerifyHelp('Wrong! Please input one more');
                setVerifyState(BORDER_STATE.ERROR);
            }
        }
    }

    // PASS
    const passRef = useRef(null);
    const [passState, setPassState] = useState(BORDER_STATE.DEFAULT);
    const [passValid, setPassValid] = useState(false);
    const [passHelp, setPassHelp] = useState('');
    const [pass, setPass] = useState('');
    const passChanged = (e) => {
        setPass(e.target.value);
        checkPassValid(e.target.value);
        if (passConfirm !== '') {
            checkPassConfirmValid(e.target.value, passConfirm);
        }
    }
    const checkPassValid = (text) => {
        const num = /\d/;
        const eng = /[a-z]/;
        const spe = /[`~!@@#$%^&*|₩₩₩'₩\";:₩/?]/;
        const numPattern = new RegExp(num);
        const engPattern = new RegExp(eng);
        const spePattern = new RegExp(spe);
        setPassValid(true);
        setPassHelp('');

        passDone = false;
        if(text.length <= 12 && text.length >= 8) {
            setPassValid(false);
            setPassHelp('not enough length');
            setPassState(BORDER_STATE.ERROR);
            return;
        }
        if (text.match(numPattern) === null) {
            setPassValid(false);
            setPassHelp('no number');
            setPassState(BORDER_STATE.ERROR);
            return;
        }
        if (text.match(engPattern) === null) {
            setPassValid(false);
            setPassHelp('no english');
            setPassState(BORDER_STATE.ERROR);
            return;
        }
        if (text.match(spePattern) === null) {
            setPassValid(false);
            setPassHelp('no special character');
            setPassState(BORDER_STATE.ERROR);
            return;
        }
        passDone = true;
        setPassValid(true);
        setPassHelp('Complete');
        setPassState(BORDER_STATE.COMPLETE);
    }

    // PASS CONFIRM
    const passConfirmRef = useRef(null);
    const [passConfirmState, setPassConfirmState] = useState(BORDER_STATE.DEFAULT);
    const [passConfirmValid, setPassConfirmValid] = useState(false);
    const [passConfirmHelp, setPassConfirmHelp] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const passConfirmChanged = (e) => {
        setPassConfirm(e.target.value);
        checkPassConfirmValid(pass, e.target.value);
    }
    const checkPassConfirmValid = (passData, passConfirmData) => {
        if (passData !== passConfirmData) {
            passConfirmDone = false;
            setPassConfirmHelp('Password is not matched');
            setPassConfirmState(BORDER_STATE.ERROR);
            setPassConfirmValid(true);
        } else {
            passConfirmDone = true;
            setPassConfirmHelp('');
            setPassConfirmState(BORDER_STATE.COMPLETE);
            setPassConfirmValid(true);
        }
    }

    // NICKNAME
    const nameRef = useRef(null);
    const [nameState, setNameState] = useState(BORDER_STATE.DEFAULT);
    const [name, setName] = useState('');
    const nameChanged = (e) => {
        setName(e.target.value);
    }

    // Wallet
    const [walletLoading, setWalletLoading] = useState(false);
    const connectWallet = () => {
    }


    // FOCUS EVENT
    const focusInEvent = (e) => {
        switch (document.activeElement) {
            case emailRef.current:
                if (!emailDone) {
                    setEmailHelp('');
                    setEmailState(() => BORDER_STATE.FOCUS);
                }
                break;
            case verifyRef.current:
                if (!verifyDone) {
                    setVerifyState(() => BORDER_STATE.FOCUS);
                }
                break;
            case passRef.current:
                if (!passDone) {
                    setPassState(() => BORDER_STATE.FOCUS);
                }
                break;
            case passConfirmRef.current:
                if (!passConfirmDone) {
                    setPassConfirmState(() => BORDER_STATE.FOCUS);
                }
                break;
            case nameRef.current:
                if (!name) {
                    setNameState(() => BORDER_STATE.FOCUS);
                }
                break;
            default:
                break;
        }
    }
    const focusOutEvent = (e) => {
        e.preventDefault();
        if (!emailDone) {
            setEmailHelp('');
            setEmailState(() => BORDER_STATE.DEFAULT);
        }
        if (!verifyDone) {
            setVerifyState(() => BORDER_STATE.DEFAULT);
        }
        if (!passDone) {
            setPassState(() => BORDER_STATE.DEFAULT);
        }
        if (!passConfirmDone) {
            setPassConfirmState(() => BORDER_STATE.DEFAULT);
        }
        setNameState(BORDER_STATE.DEFAULT);
    }
    useLayoutEffect(() => {
        window.addEventListener('focusin', focusInEvent)
        window.addEventListener('focusout', focusOutEvent)

        return () => {
            window.removeEventListener('focusin', focusInEvent);
            window.removeEventListener('focusout', focusOutEvent);
        };
    }, []);

    // ALL DONE OBSERVER
    useEffect(() => {
        if (emailDone && verifyDone && passDone && passConfirmDone) {
            setAllDone(true);
        } else {
            setAllDone(false);
        }
    }, [emailDone, verifyDone, passDone, passConfirmDone]);

    // SUBMIT
    const [submitLoading, setSubmitLoading] = useState(false);
    const submitHandler = async () => {
        setSubmitLoading(true);
        try {
            api.signUp(email, pass).then((result) => {
                if(result) {
                    alert('Sign Up Success!');
                    navigator('/');
                } else {
                    alert('Sign Up Failed!');
                }
                setSubmitLoading(false);
            });
            console.log('asd');
        } catch (e) {
            console.log('asdaa');
            alert('Sign Up Failed!');
        }
    }

    return (
        <Container>
            <Inner>
                <SizeBox h={140}/>
                <div className={'h3'}>
                    Enter account info
                </div>

                {/* EMAIL */}
                <SizeBox h={40}/>
                <div className={'h4'}>
                    The registration process is subject to change based on<br/>
                    the information provide.<br/>
                    Enter your email to be used your account.
                </div>
                <SizeBox h={24}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => emailRef.current = el} input={email}
                           holder={'example@gmail.com'} disabled={emailState === BORDER_STATE.COMPLETE}
                           onChange={emailChanged}
                           valid={emailValid} msg={emailChecked ? 'Send code' : 'Check'}
                           btnClicked={emailChecked ? sendCode : checkEmail} state={emailState}/>
                </SizeBox>
                <HelpMessage color={emailState} visible={emailHelp !== ''}>
                    {emailHelp}
                </HelpMessage>

                {/* VERIFY */}
                <SizeBox h={24}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => verifyRef.current = el} input={verify}
                           holder={'verify code'} disabled={verifyState === BORDER_STATE.COMPLETE}
                           onChange={verifyChanged}
                           valid={verifyValid} msg={'Verify'}
                           btnClicked={verifyCode} state={verifyState}/>
                </SizeBox>
                <HelpMessage color={verifyState} visible={verifyHelp !== ''}>
                    {verifyHelp}
                </HelpMessage>

                {/* PASS */}
                <SizeBox h={30}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => passRef.current = el} input={pass}
                           holder={'password'}
                           onChange={passChanged}
                           valid={passValid}
                           state={passState}/>
                </SizeBox>
                <HelpMessage color={passState} visible={passHelp !== ''}>
                    {passHelp}
                </HelpMessage>

                {/* PASS CONFIRM */}
                <SizeBox h={30}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => passConfirmRef.current = el} input={passConfirm}
                           holder={'password confirm'}
                           onChange={passConfirmChanged}
                           valid={passConfirmValid}
                           state={passConfirmState}/>
                </SizeBox>
                <HelpMessage color={passConfirmState} visible={passConfirmHelp !== ''}>
                    {passConfirmHelp}
                </HelpMessage>

                <SizeBox h={30}/>
                <ColorBox color={COLOR_BOX_TYPES.NOTICE}>
                    Your password must :<br/><br/>
                    1. Include an Upper and Lowercase Letter at least 1<br/>
                    2. Include Number<br/>
                    3. Include one or more of these special characters : .@!%*#?&<br/>
                    4. Be between 8 and 12 characters.<br/>
                </ColorBox>

                {/* NICKNAME */}
                <SizeBox h={80}/>
                <div className={'h3'}>
                    Nickname (Optional)
                </div>

                <SizeBox h={20}/>
                <div className={'h4'}>
                    Get your own nickname. It can be passed.
                </div>

                <SizeBox h={20}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => nameRef.current = el} input={name}
                           holder={'nickname'}
                           onChange={nameChanged}
                           state={nameState}/>
                </SizeBox>

                <SizeBox h={80}/>
                <SizeBox w={'100%'} h={60}>
                    <SquareBtn type={0} active={allDone} onClick={submitHandler}>
                        Create Account
                    </SquareBtn>
                </SizeBox>
            </Inner>

            <SizeBox h={160}/>
        </Container>
    );
}

export default SignUpPage;