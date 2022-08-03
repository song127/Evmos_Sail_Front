import {useEffect, useLayoutEffect, useRef, useState} from "react";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import Selector from "../../../components/global/Selector";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import PercentBar from "../../../components/global/PercentBar";
import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import {MESSAGE_TYPES} from "../../../components/global/ToastMessage";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as Heart} from "../../../assets/icons/icon-green_heart.svg";
import {ReactComponent as Gas} from "../../../assets/icons/icon-gas-station.svg";
import {CompleteTypes, ToastOptions} from "./index";
import ConfirmBtn from "../../../components/global/ConfirmBtn";
import {useNavigate} from "react-router-dom";
import SuccessMessageContent from "../../../components/global/SuccessMessageContent";
import BorderButton from "../../../components/global/BorderButton";
import {useDispatch, useSelector} from "react-redux";
import ActionsAPI from "../../../network/ActionsAPI";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import DoneModal from "../../../components/global/modals/Modals/DoneModal";
import DataApi from "../../../network/DataApi";
import {connect} from "../../../redux/blockchain/blockchainActions";

const Backboard_1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 500px;
  height: 850px;

  background-color: ${c.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 50px 60px;
`;

// Sub
const Backboard_2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 500px;
  height: 270px;

  background-color: ${c.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 50px 60px;
`;

const Title = styled.div`
  width: max-content;
  height: max-content;

  color: ${c.font_color};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
`;

const SubTitle = styled.div`
  width: max-content;
  height: max-content;

  color: ${c.gray_3};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 500;
`;

const itemList = ['DAI'];

const shorItemList = ['ETH'];

function ShortStart({setTitle, setContent, setLink, setModal, setType, setLoadingModal}) {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();
    const dispatch = useDispatch();

    const [approveCount, setApproveCount] = useState(0);
    const [approveLoading, setApproveLoading] = useState(true);

    // USER
    const [myBalance, setMyBalance] = useState(0.0);
    const [nowDaiBalance, setNowDaiBalance] = useState(0.091);

    const [collateralTokenIndex, setCollateralTokenIndex] = useState(0);
    const collateralTokenRef = useRef(null);
    const [collateralToken, setCollateralToken] = useState('');
    const collateralTokenOnchange = (e) => {
        setCollateralToken(e.target.value);
    }
    const macroHandler = (value) => {
        const collateralBalance = (myBalance * value / 100).toString();
        setCollateralToken(collateralBalance);
    }

    const [shortTokenIndex, setShortTokenIndex] = useState(0);
    const shortTokenRef = useRef(null);
    const [shortToken, setShortToken] = useState('');
    const shortTokenOnchange = (e) => {
        setShortToken(e.target.value);
    }

    const [apyIndex, setApyIndex] = useState(0);
    const [slippageIndex, setSlippageIndex] = useState(0);

    const [barValue, setBarValue] = useState(0);
    const onChangeBar = (value) => {
        setBarValue(value);
    }

    // datas
    const [healthFactor, setHealthFactor] = useState(0);
    const [gasFee, setGasFee] = useState(0);
    const [apy, setApy] = useState(0);

    const approveToBorrowEth = async () => {
        setLoadingModal(true);
        const result = await actionApi.approveBorrowEth(blockchain);
        if (result) {
            setApproveCount(1);
            setTitle('Successfully Approve To Aave Borrow Contract');
            setContent('Thank you bro!\n ');
            setLink('/Short');
            modalHandler();
        } else {
            setTitle('Approve To Aave Borrow Contract Failed');
            setContent('Please Approve To Aave Borrow Contract Again\n ');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const approveToAavePool = async () => {
        setLoadingModal(true);
        const result = await actionApi.approveTokenAave(blockchain);
        if (result) {
            setApproveCount(2);
            setTitle('Successfully Approve To Aave Pool Contract');
            setContent('Thank you bro!\n');
            setLink('/Short');
            modalHandler();
        } else {
            setTitle('Approve To Aave Pool Contract Failed');
            setContent('Please Approve To Aave Pool Contract Again\n');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const approveToUniSwap = async () => {
        setLoadingModal(true);
        const result = await actionApi.approveTokenUniSwap(blockchain);
        if (result) {
            setApproveCount(3);
            setTitle('Successfully Approve To UniSwap Contract');
            setContent('Thank you bro!\n');
            setLink('/Short');
            modalHandler();
        } else {
            setTitle('Approve To UniSwap Contract Failed');
            setContent('Please Approve To UniSwap Contract Again\n');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const shortStartHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.shortStartW(blockchain, collateralToken, shortToken);
        if (result) {
            setTitle('Successfully completed Short start');
            setContent('Short Start requirement has been sent to our server successfully.\n' +
                'Good to go, bro!');
            setLink('/Short');
            modalHandler();
            await getDatas();
        } else {
            setTitle('Short Start Failed');
            setContent('Please short start again\n');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const modalHandler = () => {
        setModal(true);
        setType(CompleteTypes.SHORT_START);
    }

    // GetDatas
    const getDatas = async () => {
        if (blockchain.account) {
            const myBalance = await dataApi.getDepositDaiBalance(blockchain);
            setMyBalance(myBalance);
            setNowDaiBalance(0.091);
            setApy(27.4);
            setGasFee(0.003452);
        }
    }

    useEffect(async () => {
        if (blockchain.account) {
            await getDatas();
        }
    }, [blockchain]);

    useEffect(async () => {
        if (blockchain.account) {
            setApproveLoading(true);
            if (await dataApi.isApprovedBorrowEth(blockchain)) {
                setApproveCount(1);
            }
            if (await dataApi.isApprovedAavePool(blockchain)) {
                setApproveCount(2);
            }
            if (await dataApi.isApprovedUniSwap(blockchain)) {
                setApproveCount(3);
            }
            setApproveLoading(false);
        }
    }, [blockchain]);

    useEffect(async () => {
        dispatch({type: DATA_TYPES.MENU, data: 'short'})
    }, []);

    return (
        <>
            {/* LEFT */}
            <SizeBox h={30}/>
            <div className={`all-f-row`}>
                <Backboard_1>
                    <Title>
                        Collateral
                    </Title>

                    <SizeBox h={30}/>
                    <div className={'f-row a-end j-end'}>
                        <SubTitle>
                            Current my balance : {myBalance.toFixed(4)} DAI
                        </SubTitle>
                    </div>

                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            ref={collateralTokenRef} input={collateralToken}
                            disabled={false}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            onChange={collateralTokenOnchange}
                            btn={
                                <SizeBox w={150} h={60}>
                                    <Selector list={itemList} index={collateralTokenIndex}
                                              setIndex={setCollateralTokenIndex}/>
                                </SizeBox>}/>
                    </SizeBox>

                    <SizeBox h={30}/>
                    <div className={'f-row'}>
                        <BorderButton
                            onClick={() => macroHandler(50)}>
                            50%
                        </BorderButton>

                        <SizeBox w={18}/>
                        <BorderButton
                            onClick={() => macroHandler(100)}>
                            Max
                        </BorderButton>
                    </div>

                    <SizeBox h={24}/>
                    <Title>
                        Short
                    </Title>

                    <SizeBox h={10}/>
                    <div className={'f-row a-end j-end'}>
                        <SubTitle>
                            1 DAI ≈ {nowDaiBalance.toFixed(3)} ETH
                        </SubTitle>
                    </div>

                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            ref={shortTokenRef} input={shortToken}
                            disabled={false}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            onChange={shortTokenOnchange}
                            btn={
                                <SizeBox w={150} h={60}>
                                    <Selector list={shorItemList} index={shortTokenIndex}
                                              setIndex={setShortTokenIndex}/>
                                </SizeBox>}/>
                    </SizeBox>

                    <SizeBox h={48}/>
                    <Title>
                        APY
                    </Title>

                    <SizeBox h={8}/>
                    <div className={'f-row a-end j-end'}>
                        <SubTitle>
                            27.4 %
                        </SubTitle>
                    </div>

                    <SizeBox h={30}/>
                    <div className={'f-row'}>
                        <BorderButton
                            selected={apyIndex === 0}
                            onClick={() => setApyIndex(0)}>
                            Stable
                        </BorderButton>

                        <SizeBox w={18}/>
                        <BorderButton
                            selected={apyIndex === 1}
                            onClick={() => setApyIndex(1)}>
                            Variable
                        </BorderButton>
                    </div>

                    <SizeBox h={48}/>
                    <Title>
                        Slippage Tolerance
                    </Title>

                    <SizeBox h={30}/>
                    <div className={'f-row'}>
                        <BorderButton
                            selected={slippageIndex === 0}
                            onClick={() => setSlippageIndex(0)}>
                            1%
                        </BorderButton>

                        <SizeBox w={18}/>
                        <BorderButton
                            selected={slippageIndex === 1}
                            onClick={() => setSlippageIndex(1)}>
                            3%
                        </BorderButton>
                    </div>

                    <SizeBox h={48}/>
                    <SizeBox w={'100%'} h={60}>
                        {
                            approveLoading ?
                                <BasicSquareBtn
                                    active={true}
                                    onClick={() => {}}>
                                    Loading
                                </BasicSquareBtn> :
                                <>
                                    {approveCount === 0 && blockchain.account ?
                                        <BasicSquareBtn
                                            active={true}
                                            onClick={() => approveToBorrowEth()}>
                                            Approve Eth To Borrow
                                        </BasicSquareBtn> : null
                                    }
                                    {approveCount === 1 && blockchain.account ?
                                        <BasicSquareBtn
                                            active={true}
                                            onClick={() => approveToAavePool()}>
                                            Approve Token
                                        </BasicSquareBtn> : null
                                    }
                                    {approveCount === 2 && blockchain.account ?
                                        <BasicSquareBtn
                                            active={true}
                                            onClick={() => approveToUniSwap()}>
                                            Approve Token To UniSwap
                                        </BasicSquareBtn> : null
                                    }
                                    {approveCount === 3 && blockchain.account ?
                                        <BasicSquareBtn
                                            active={true}
                                            onClick={() => shortStartHandler()}>
                                            short start
                                        </BasicSquareBtn> : null
                                    }
                                </>
                        }
                    </SizeBox>
                </Backboard_1>

                {/* RIGHT */}
                <SizeBox w={20}/>
                <SizeBox w={500} h={'100%'}>
                    <div className={'all-f-column j-space'}>
                        <Backboard_2>
                            <Title>
                                Your LTV
                            </Title>

                            <SizeBox h={80}/>
                            <PercentBar value={barValue} onChange={onChangeBar} step={0.1} min={0} max={70}/>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <Title>
                                Health Factor
                            </Title>

                            <SizeBox h={60}/>
                            <div className={'f-row a-center'}>
                                <Heart/>

                                <SizeBox w={16}/>
                                1.5325
                            </div>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <Title>
                                Gas Fee(Estimated)
                            </Title>

                            <SizeBox h={60}/>
                            <div className={'f-row a-center'}>
                                <Gas/>

                                <SizeBox w={16}/>
                                {gasFee.toFixed(6)}
                            </div>
                        </Backboard_2>
                    </div>
                </SizeBox>
            </div>
        </>
    );
}

export default ShortStart;