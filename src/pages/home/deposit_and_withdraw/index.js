import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import RoundTab from "../../../components/global/RoundTab";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";
import Selector from "../../../components/global/Selector";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import useMediaQuery from "react-responsive";
import BorderButton from "../../../components/global/BorderButton";
import ToastMessage, {MESSAGE_TYPES} from "../../../components/global/ToastMessage";
import SuccessMessageContent from "../../../components/global/SuccessMessageContent";
import {CompleteTypes} from "../short_selling";
import ActionsAPI from "../../../network/ActionsAPI";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 520px;

  animation: ${ContentLoaded} 1.0s;
  animation-fill-mode: forwards;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: max-content;
  background-color: ${c.white};
  border-radius: 16px;
  padding-left: 58px;
  padding-right: 58px;
`;

const itemList = [
    'DAI',
]

const tabList = [
    'Deposit',
    'Withdraw',
];

function DepositAndWithdraw() {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();

    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);
    const [inputTokenIndex, setInputTokenIndex] = useState(0);

    const [availableDAI, setAvailableDAI] = useState(100);
    const [myBalance, setMyBalance] = useState(0);

    const inputTokenRef = useRef(null);
    const [inputToken, setInputToken] = useState('');
    const inputTokenOnchange = (e) => {
        setInputToken(e.target.value);
    }
    const macroHandler = (value) => {
        if (tabIndex === 0) {
            const input = availableDAI * value / 100;
            setInputToken(input.toString());
        } else {
            const input = myBalance * value / 100;
            setInputToken(input.toString());
        }
    }

    const isPc = useMediaQuery({
        query: '(min-width: 920px)'
    });

    const [toastOn, setToastOn] = useState(false);
    const [toastType, setToastType] = useState(MESSAGE_TYPES.COMPLETE);
    const [toastContent, setToastContent] = useState(null);

    const depositToastHandler = () => {
        if (toastOn) {
            setToastOn(false);
            setTimeout(() => {
                setToastOn(true);
                setToastType(MESSAGE_TYPES.COMPLETE);
                setToastContent(<SuccessMessageContent type={CompleteTypes.DEPOSIT}
                                                       link={'/Short'}/>);
            }, 10);
        } else {
            setToastOn(true);
            setToastType(MESSAGE_TYPES.COMPLETE);
            setToastContent(<SuccessMessageContent type={CompleteTypes.DEPOSIT}
                                                   link={'/Short'}/>);
        }
    }

    const depositHandler = async () => {
        await actionApi.approveToken(blockchain).then((result) => {
            if (result === 0) {
                actionApi.depositW(blockchain, parseInt(inputToken)).then((result) => {
                    if(result) {
                        depositToastHandler();
                    } else {

                    }
                });
            } else if (result === 1) {

            } else {
                alert('Fail');
            }
        });
    }

    const withdrawToastHandler = async () => {
        if (toastOn) {
            setToastOn(false);
            setTimeout(() => {
                setToastOn(true);
                setToastType(MESSAGE_TYPES.COMPLETE);
                setToastContent(<SuccessMessageContent type={CompleteTypes.WITHDRAW}
                                                       close={setToastOn}/>);
            }, 10);
        } else {
            setToastOn(true);
            setToastType(MESSAGE_TYPES.COMPLETE);
            setToastContent(<SuccessMessageContent type={CompleteTypes.WITHDRAW}
                                                   close={setToastOn}/>);
        }
    }

    const withdrawHandler = async () => {
        await actionApi.approveToken(blockchain).then((result) => {
            if (result === 0) {
                actionApi.withdrawW(blockchain, parseInt(inputToken)).then((result) => {
                    if(result) {
                        withdrawToastHandler();
                    } else {

                    }
                });
            } else if (result === 1) {

            } else {
                alert('Fail');
            }
        });
    }

    // GetDatas
    const getDatas = async () => {
        if(blockchain.account) {
            const balance = await actionApi.getMyDaiBalance(blockchain);
            setAvailableDAI(balance);
        }
    }

    useEffect(() => {
        setInputToken('');
    }, [tabIndex]);

    useEffect(async () => {
        dispatch({type: DATA_TYPES.MENU, data: 'transaction'});
        await getDatas();
    }, []);

    return (
        <>
            {toastOn ? <ToastMessage type={toastType} onClick={() => setToastOn(false)}>
                {toastContent}
            </ToastMessage> : null}
            <Container>
                <SizeBox h={160}/>
                <RoundTab list={tabList} index={tabIndex} setIndex={setTabIndex}/>

                <SizeBox h={70}/>
                <Box>
                    <SizeBox h={80}/>
                    <div className={'f-row j-end a-center'}>
                        {tabIndex === 0 ?
                            `Available: ${availableDAI} DAI` :
                            `My Balance: ${myBalance} DAI`
                        }
                    </div>
                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            ref={inputTokenRef} input={inputToken} disabled={false}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            onChange={inputTokenOnchange}
                            btn={
                                <SizeBox w={150} h={60}>
                                    <Selector list={itemList} index={inputTokenIndex} setIndex={setInputTokenIndex}/>
                                </SizeBox>}/>
                    </SizeBox>

                    <SizeBox h={44}/>
                    <div className={'f-row a-center j-center'}>
                        <BorderButton onClick={() => macroHandler(25)}>
                            25%
                        </BorderButton>

                        <SizeBox w={12}/>
                        <BorderButton onClick={() => macroHandler(50)}>
                            50%
                        </BorderButton>

                        <SizeBox w={12}/>
                        <BorderButton onClick={() => macroHandler(100)}>
                            MAX
                        </BorderButton>
                    </div>

                    <SizeBox h={84}/>
                    <SizeBox w={'100%'} h={60}>
                        <BasicSquareBtn active={true}
                                        onClick={async () => {
                                            if (tabIndex === 0) {
                                                await depositHandler();
                                            } else {
                                                await withdrawHandler();
                                            }
                                        }}
                        >
                            {tabList[tabIndex]} Start
                        </BasicSquareBtn>
                    </SizeBox>

                    <SizeBox h={100}/>
                </Box>

                <SizeBox w={120}/>
            </Container>
        </>
    );
}

export default DepositAndWithdraw;