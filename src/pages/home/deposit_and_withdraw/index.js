import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import RoundTab from "../../../components/global/RoundTab";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {ContentLoaded} from "../../../components/utils/actions/Animations";
import Selector from "../../../components/global/Selector";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import useMediaQuery from "react-responsive";
import BorderButton from "../../../components/global/BorderButton";
import SuccessMessageContent from "../../../components/global/SuccessMessageContent";
import {CompleteTypes} from "../short_selling";
import ActionsAPI from "../../../network/ActionsAPI";
import DoneModal from "../../../components/global/modals/Modals/DoneModal";
import DataApi from "../../../network/DataApi";
import Loading from "../../Loading";
import actionsAPI from "../../../network/ActionsAPI";
import LoadingModal from "../../../components/global/modals/Modals/LoadingModal";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";

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

const Token = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 110px;
  height: 50px;

  font-weight: 400;
  font-family: Montserrat;
  font-size: 16px;
`;

const itemList = [
    'DAI',
]

const tabList = [
    'Deposit',
    'Withdraw',
];

function DepositAndWithdraw() {
    const dispatch = useDispatch();
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const [loadingModal, setLoadingModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState(0);

    const [loading, setLoading] = useState(true);

    const [approved, setApproved] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const approveToken = async () => {
        setLoadingModal(true);
        const result = await actionApi.approveToken(blockchain);
        if (result) {
            setApproved(true);
        }
        setLoadingModal(false);
    }

    const [tabIndex, setTabIndex] = useState(0);

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

    const depositModalHandler = () => {
        setModal(true);
        setType(CompleteTypes.DEPOSIT);
    }

    const depositHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.depositW(blockchain, inputToken);
        setLoadingModal(false);
        if (result) {
            setTitle('Completed Deposit');
            setContent('The deposit statement has been requested.\n' +
                'After a few progress, you can check the Sail deposit statement on the Current Asset page.');
            setLink('/Short');
            depositModalHandler();
            await getDatas();
        } else {
            setTitle('Deposit Failed');
            setContent('Please deposit again');
            setLink(undefined);
            depositModalHandler()
        }
    }

    const withdrawModalHandler = () => {
        setModal(true);
        setType(CompleteTypes.WITHDRAW);
    }

    const withdrawHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.withdrawW(blockchain, inputToken);
        setLoadingModal(false);
        if (result) {
            setTitle('Completed Withdraw');
            setContent('The Withdraw statement you sent has been requested.\n' +
                'Go to your wallet and check out your wallet balance.');
            setLink('/Short');
            withdrawModalHandler();
            await getDatas();
        } else {
            setTitle('Withdraw Failed');
            setContent('Please withdraw again');
            setLink(undefined);
            withdrawModalHandler();
        }
    }

    // GetDatas
    const getDatas = async () => {
        if (blockchain.account) {
            const balance = await dataApi.getMyDaiBalance(blockchain);
            const myBalance = await dataApi.getDepositDaiBalance(blockchain);
            setAvailableDAI(balance);
            setMyBalance(myBalance);

            const approved = await dataApi.isApprovedToken(blockchain);
            setApproved(approved);

            setLoading(false);
        }
    }

    useEffect(() => {
        if(actionApi.checkNumber(inputToken)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [inputToken]);

    useEffect(() => {
        setInputToken('');
    }, [tabIndex]);

    useEffect(async () => {
        dispatch({type: DATA_TYPES.MENU, data: 'transaction'});
        await getDatas();
    }, [blockchain.account]);

    return (
        <>{loading ? <Loading/> : <>
            {loadingModal ? <LoadingModal/> : null}
            {modal ? <DoneModal title={title} content={content}
                                setModal={setModal} type={type} link={link}/> : null}
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
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
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
                    {approved || tabIndex == 1 ?
                        <SizeBox w={'100%'} h={60}>
                            <BasicSquareBtn active={isValid}
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
                        </SizeBox> :
                        <SizeBox w={'100%'} h={60}>
                            <BasicSquareBtn active={true}
                                            onClick={approveToken}>
                                Approve Token
                            </BasicSquareBtn>
                        </SizeBox>
                    }

                    <SizeBox h={100}/>
                </Box>

                <SizeBox w={120}/>
            </Container>
        </>}</>
    );
}

export default DepositAndWithdraw;