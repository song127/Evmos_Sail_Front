import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import Input, {BORDER_STATE} from "../../../components/global/Input";
import {useState, useRef, useEffect, useLayoutEffect, forwardRef} from "react";
import SquareBtn from "../../../components/global/SquareBtn";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";

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

function ResetPassPage() {
    const [allDone, setAllDone] = useState(false);

    // EMAIL
    const emailRef = useRef(null);
    const [emailState, setEmailState] = useState(BORDER_STATE.DEFAULT);
    const [emailValid, setEmailValid] = useState(false);
    const [emailHelp, setEmailHelp] = useState('');
    const [email, setEmail] = useState('');
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

    // FOCUS EVENT
    const focusInEvent = (e) => {
        e.preventDefault();
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
    const submitHandler = () => {
        //TODO: 이메일 리셋 API 전송
    }

    return (
        <Container>
            <Inner>
                <SizeBox h={180}/>
                <div className={'h3'}>
                    Reset the password
                </div>

                {/* EMAIL */}
                <SizeBox h={42}/>
                <div className={'h4'}>
                    To continue, first verify it’s you
                </div>
                <SizeBox h={24}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => emailRef.current = el} input={email}
                           holder={'example@gmail.com'} disabled={emailState === BORDER_STATE.COMPLETE}
                           onChange={emailChanged}
                           valid={emailValid} msg={'Send code'}
                           btnClicked={sendCode} state={emailState}/>
                </SizeBox>
                <HelpMessage color={emailState} visible={emailHelp !== ''}>
                    {emailHelp}
                </HelpMessage>

                {/* VERIFY */}
                <SizeBox h={40}/>
                <div className={'h4'}>
                    Please, verify Your code!
                </div>
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
                <SizeBox h={60}/>
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
                <SizeBox h={40}/>
                <SizeBox w={'100%'} h={60}>
                    <Input ref={el => passConfirmRef.current = el}
                           input={passConfirm}
                           holder={'password confirm'}
                           onChange={passConfirmChanged}
                           valid={passConfirmValid}
                           state={passConfirmState}/>
                </SizeBox>
                <HelpMessage color={passConfirmState} visible={passConfirmHelp !== ''}>
                    {passConfirmHelp}
                </HelpMessage>

                <SizeBox h={80}/>
                <SizeBox w={'100%'} h={60}>
                    <SquareBtn type={0} active={allDone} onClick={submitHandler}>
                        Submit
                    </SquareBtn>
                </SizeBox>
            </Inner>

            <SizeBox h={120}/>
        </Container>
    );
}

export default ResetPassPage;