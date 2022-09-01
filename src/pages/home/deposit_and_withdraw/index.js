import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import RoundTab from "../../../components/global/RoundTab";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {ContentLoaded} from "../../../components/utils/actions/Animations";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import BorderButton from "../../../components/global/BorderButton";
import {CompleteTypes} from "../short_selling";
import ActionsAPI from "../../../network/ActionsAPI";
import DoneModal from "../../../components/global/modals/DoneModal";
import DataApi from "../../../network/DataApi";
import Loading from "../../Loading";
import LoadingModal from "../../../components/global/modals/LoadingModal";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import SubValueBackBoard from "../../../components/global/SubValueBackBoard";
import H5 from "../../../components/utils/texts/H5";
import Spacer from "../../../components/utils/blocks/Spacer";
import Sub1 from "../../../components/utils/texts/Sub1";
import {LOG} from "../../../styles/utils";
import ToolTip from "../../../components/global/ToolTip";
import Token from "../../../components/global/Token";

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

    const [ratio, setRatio] = useState(0);
    const [tabIndex, setTabIndex] = useState(0);

    const [availableDAI, setAvailableDAI] = useState(100);
    const [myBalance, setMyBalance] = useState(0);

    const inputTokenRef = useRef(null);
    const [inputToken, setInputToken] = useState('');

    const inputTokenOnchange = (e) => {
        setRatio(0);
        if(tabIndex === 0) {
            if(e.target.value === '' || e.target.value === 'NaN' || parseFloat(e.target.value) <= availableDAI) {
                setInputToken(e.target.value);
            } else {
                setInputToken(availableDAI.toString());
            }
        } else if (tabIndex === 1) {
            if(e.target.value === '' || e.target.value === 'NaN' || parseFloat(e.target.value) <= myBalance) {
                setInputToken(e.target.value);
            } else {
                setInputToken(myBalance.toString());
            }
        }
    }

    const macroHandler = (value) => {
        setRatio(value);
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
            setLink(undefined);
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
            LOG(balance);
            setAvailableDAI(balance);
            setMyBalance(myBalance);

            const approved = await dataApi.isApprovedToken(blockchain);
            setApproved(approved);

            setLoading(false);
        }
    }

    useEffect(() => {
        if (actionApi.checkNumber(dataApi.toFixed(inputToken))) {
            setIsValid(true);
            let ratioValue;
            if(tabIndex === 0) {
                ratioValue = parseFloat(inputToken) / availableDAI * 100;
            } else {
                ratioValue = parseFloat(inputToken) / myBalance * 100;
            }
            setRatio(ratioValue);
        } else {
            setIsValid(false);
        }
    }, [inputToken]);

    useEffect(async () => {
        setInputToken('');
        setRatio(0);
        await getDatas();
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
                <SubValueBackBoard>
                    <H5 color={c.black}>
                        {tabIndex === 0 ? 'Main Wallet Balance' : 'Sub Wallet Balance'}
                    </H5>

                    <SizeBox h={10}/>
                    {
                        tabIndex === 0 ?
                            <div className={'f-row'}>
                                <Sub1>
                                    Available to deposit
                                </Sub1>

                                <Spacer/>
                                <DAI/>

                                <SizeBox w={8}/>
                                <H5>
                                    {availableDAI.toFixed(4)}
                                </H5>
                            </div> :
                            <>
                                <div className={'f-row'}>
                                    <Sub1>
                                        Available to withdraw
                                    </Sub1>

                                    <Spacer/>
                                    <DAI/>

                                    <SizeBox w={8}/>
                                    <H5>
                                        {myBalance.toFixed(4)}
                                    </H5>
                                </div>

                                <div className={'f-row'}>
                                    <Sub1>
                                        My total profit
                                    </Sub1>

                                    <Spacer/>
                                    <DAI/>

                                    <SizeBox w={8}/>
                                    <H5>
                                        0,0000
                                        {/*{availableDAI.toFixed(4)}*/}
                                    </H5>
                                </div>
                            </>
                    }
                </SubValueBackBoard>

                <SizeBox h={24}/>
                <Box>
                    <SizeBox h={80}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            ref={inputTokenRef} input={dataApi.toFixed(inputToken)} disabled={false}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            onChange={inputTokenOnchange}
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    <SizeBox h={44}/>
                    <div className={'f-row a-center j-center'}>
                        <BorderButton selected={ratio == 25}
                                      onClick={() => macroHandler(25)}>
                            25%
                        </BorderButton>

                        <SizeBox w={12}/>
                        <BorderButton selected={ratio == 50}
                                      onClick={() => macroHandler(50)}>
                            50%
                        </BorderButton>

                        <SizeBox w={12}/>
                        <BorderButton selected={ratio == 100}
                                      onClick={() => macroHandler(100)}>
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
                                {isValid ? tabList[tabIndex] : 'Enter an amount'}
                            </BasicSquareBtn>
                        </SizeBox> :
                        <div className={'f-column a-center'}>
                            <SizeBox w={'100%'} h={60}>
                                <BasicSquareBtn active={true}
                                                onClick={approveToken}>
                                    Approve Token
                                </BasicSquareBtn>
                            </SizeBox>

                            <SizeBox h={16}/>
                            <div className={'f-row'}>
                                <H5>
                                    Why You Approve tokens
                                </H5>

                                <SizeBox w={8}/>
                                <ToolTip>
                                    Approve Tooltip
                                </ToolTip>
                            </div>
                        </div>
                    }

                    <SizeBox h={100}/>
                </Box>

                <SizeBox w={120}/>
            </Container>
        </>}</>
    );
}

export default DepositAndWithdraw;