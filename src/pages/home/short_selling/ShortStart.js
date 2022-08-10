import {useEffect, useLayoutEffect, useRef, useState} from "react";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import Selector from "../../../components/global/Selector";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import PercentBar from "../../../components/global/PercentBar";
import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as Heart} from "../../../assets/icons/icon-green_heart.svg";
import {ReactComponent as Gas} from "../../../assets/icons/icon-gas-station.svg";
import {ReactComponent as LT} from "../../../assets/images/image-LT.svg";
import {ReactComponent as MaxLTV} from "../../../assets/images/image-max_ltv.svg";
import {CompleteTypes} from "./index";
import BorderButton from "../../../components/global/BorderButton";
import {useDispatch, useSelector} from "react-redux";
import ActionsAPI from "../../../network/ActionsAPI";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import DataApi from "../../../network/DataApi";
import ToolTip from "../../../components/global/ToolTip";
import {TokenAddress} from "../../../datas/Address";

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
  display: flex;
  flex-direction: row;

  white-space: nowrap;

  width: 100%;
  height: max-content;

  color: ${c.font_color};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
`;

const SubTitle = styled.div`
  cursor: pointer;

  width: max-content;
  height: max-content;

  color: ${c.gray_3};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 500;
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

const LTImg = styled(LT)`
  position: absolute;

  top: 300px;
  right: 60px;
`;

const LTVImg = styled(MaxLTV)`
  position: absolute;

  top: 410px;
  right: 213px;
`;

const PerBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 60px;
  height: 40px;
  background-color: ${c.font_color};
  border-radius: 8px;

  color: ${c.white};
`;

// const itemList = ['DAI'];

const shorItemList = ['ETH'];

function ShortStart({setLoading, setTitle, setContent, setLink, setModal, setType, setLoadingModal}) {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);

    const [approveCount, setApproveCount] = useState(0);
    const [approveLoading, setApproveLoading] = useState(true);

    // USER
    const [myBalance, setMyBalance] = useState(0.0);

    // Collateral
    const [ratioValue, setRatioValue] = useState(0);
    const collateralTokenRef = useRef(null);
    const [collateralToken, setCollateralToken] = useState('');
    const collateralTokenOnchange = (e) => {
        setCollateralToken(e.target.value);
    }
    const macroHandler = (value) => {
        setRatioValue(value);
        const collateralBalance = (myBalance * value / 100).toString();
        setCollateralToken(collateralBalance);
    }

    useEffect(() => {
        if (actionApi.checkNumber(collateralToken)) {
            const ratio = parseFloat(collateralToken) * 100 / myBalance;
            setRatioValue(ratio);
        }
    }, [collateralToken]);

    // Short
    const [shortTokenIndex, setShortTokenIndex] = useState(0);
    const shortTokenRef = useRef(null);
    const [shortToken, setShortToken] = useState('');
    const shortTokenOnchange = (e) => {
        if (e.target.value.length < 16) {
            setShortToken(e.target.value);
        }
    }

    // ETC
    // const [apyIndex, setApyIndex] = useState(0);
    const [slippageIndex, setSlippageIndex] = useState(0);

    const [barValue, setBarValue] = useState(0);
    const onChangeBar = (value) => {
        setBarValue(value);
    }

    useEffect(() => {
        const data = (parseFloat(collateralToken) * daiPrice * barValue / 100).toString();
        if (data !== 'NaN') {
            const fixed = parseFloat(data).toFixed(14).toString();
            setShortToken(fixed);
        } else {
            setShortToken('');
        }
    }, [collateralToken]);

    useEffect(() => {
        const data = (parseFloat(collateralToken) * daiPrice * barValue / 100).toString();
        if (data !== 'NaN') {
            const fixed = parseFloat(data).toFixed(14).toString();
            setShortToken(fixed);
        } else {
            setShortToken('');
        }
    }, [barValue]);

    const checkValid = () => {
        const colValid = actionApi.checkNumber(collateralToken);
        const shortValid = actionApi.checkNumber(shortToken);

        return colValid && shortValid;
    }

    useEffect(() => {
        setIsValid(checkValid());
    }, [collateralToken, shortToken]);


    // datas
    const [healthFactor, setHealthFactor] = useState(0);
    const [gasFee, setGasFee] = useState(0);
    const [apy, setApy] = useState(0);

    const multiApproveAll = async () => {
        setLoadingModal(true);
        const result = await actionApi.multiApprove(blockchain, [TokenAddress.DAI]);
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

    // const approveToBorrowEth = async () => {
    //     setLoadingModal(true);
    //     const result = await actionApi.approveBorrowEth(blockchain);
    //     if (result) {
    //         setApproveCount(1);
    //         setTitle('Successfully Approve To Aave Borrow Contract');
    //         setContent('Thank you bro!\n ');
    //         setLink('/Short');
    //         modalHandler();
    //     } else {
    //         setTitle('Approve To Aave Borrow Contract Failed');
    //         setContent('Please Approve To Aave Borrow Contract Again\n ');
    //         setLink(undefined);
    //         modalHandler();
    //     }
    //     setLoadingModal(false);
    // }
    //
    // const approveToAavePool = async () => {
    //     setLoadingModal(true);
    //     const result = await actionApi.approveTokenAave(blockchain);
    //     if (result) {
    //         setApproveCount(2);
    //         setTitle('Successfully Approve To Aave Pool Contract');
    //         setContent('Thank you bro!\n');
    //         setLink('/Short');
    //         modalHandler();
    //     } else {
    //         setTitle('Approve To Aave Pool Contract Failed');
    //         setContent('Please Approve To Aave Pool Contract Again\n');
    //         setLink(undefined);
    //         modalHandler();
    //     }
    //     setLoadingModal(false);
    // }
    //
    // const approveToUniSwap = async () => {
    //     setLoadingModal(true);
    //     const result = await actionApi.approveTokenUniSwap(blockchain);
    //     if (result) {
    //         setApproveCount(3);
    //         setTitle('Successfully Approve To UniSwap Contract');
    //         setContent('Thank you bro!\n');
    //         setLink('/Short');
    //         modalHandler();
    //     } else {
    //         setTitle('Approve To UniSwap Contract Failed');
    //         setContent('Please Approve To UniSwap Contract Again\n');
    //         setLink(undefined);
    //         modalHandler();
    //     }
    //     setLoadingModal(false);
    // }

    const shortStartHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.shortStartW(blockchain, collateralToken, shortToken);
        if (result) {
            setTitle('Successfully completed Short start');
            setContent('Short Start requirement has been sent to our server successfully.\n' +
                'Good to go, bro!');
            setLink(undefined);
            modalHandler();
            await getDatas().then(() => {
                setModal(false);
            });
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

    const [priceIndex, setPriceIndex] = useState(1);
    const [daiPrice, setDaiPrice] = useState(0.0);
    const [ethPrice, setEthPrice] = useState(0.0);
    const getPrice = async () => {
        const daiP = await dataApi.getDaiEthRate(blockchain, 0);
        const ethP = await dataApi.getDaiEthRate(blockchain, 1);
        setDaiPrice(daiP);
        setEthPrice(ethP);

        setPriceIndex(priceIndex === 0 ? 1 : 0);
    }

    // Default
    const getDatas = async () => {
        if (blockchain.account) {
            const shorted = await dataApi.getShortData(blockchain);
            const myBalance = await dataApi.getDepositDaiBalance(blockchain);
            await getPrice();
            const gasFeeData = parseFloat(await blockchain.web3.eth.getGasPrice());
            const health = await dataApi.getHealth(blockchain);
            // const totalBEth = health['totalCollateralETH'];
            // const ltv = 8000;
            // const debtEth = health['totalDebtETH'];
            // const factor = totalBEth * ltv / debtEth;
            // console.log(factor);

            setGasFee(
                gasFeeData / blockchain.web3.utils.toBN(10)
                    .pow(blockchain.web3.utils.toBN(9))
            );
            setMyBalance(myBalance);
            setApy(27.4);
            setHealthFactor(health['healthFactor'] / (10 ** 18));

            setApproveLoading(true);
            if (await dataApi.isApprovedBorrowEth(blockchain)) {
                setApproveCount(1);
            }
            if (await dataApi.isApprovedAavePool(blockchain)) {
                setApproveCount(1);
            }
            if (await dataApi.isApprovedUniSwap(blockchain)) {
                setApproveCount(3);
            }
            setApproveLoading(false);
        }
    }

    useEffect(async () => {
        if (blockchain.account) {
            await getDatas().then(() => {
                setLoading(false);
            });
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
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    <SizeBox h={30}/>
                    <div className={'f-row'}>
                        <BorderButton
                            selected={ratioValue === 50}
                            onClick={() => macroHandler(50)}>
                            50%
                        </BorderButton>

                        <SizeBox w={18}/>
                        <BorderButton
                            selected={ratioValue === 100}
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
                        <SubTitle onClick={getPrice}>
                            {priceIndex === 0 ?
                                `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :
                                `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                            }
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
                        APY (variable)
                        <SizeBox w={5}/>
                        <ToolTip title={'What is different btw stable and variable APY?'}>
                            Stable act as a fixed rated in the short-term,
                            but can be re-balanced in the long-term in response to
                            changes in market conditions. The variable rate is the
                            rate based on the offer and demand in our protocol.
                            Also it will change over the time and could be optimal
                            rate depending on market conditions.
                        </ToolTip>
                        <div className={'f-row a-end j-end'}>
                            <SubTitle>
                                27.4 %
                            </SubTitle>
                        </div>
                    </Title>

                    <SizeBox h={48}/>
                    <Title>
                        Slippage Tolerance

                        <SizeBox w={5}/>
                        <ToolTip title={'Slippage Tolerance :'}>
                            Your transaction will revert if the price
                            changes unfavorably by more than this percentage.
                        </ToolTip>
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
                                    onClick={() => {
                                    }}>
                                    Loading
                                </BasicSquareBtn> :
                                <>
                                    <BasicSquareBtn
                                        active={isValid || approveCount === 0}
                                        onClick={() => {
                                            if (approveCount === 0) {
                                                multiApproveAll();
                                            } else {
                                                shortStartHandler();
                                            }
                                        }}>
                                        {approveCount === 0 && blockchain.account ?
                                            'Approve Tokens' : null
                                        }
                                        {approveCount === 1 && blockchain.account ?
                                            'Approve Token' : null
                                        }
                                        {approveCount === 3 && blockchain.account ?
                                            'Short Start' : null
                                        }
                                    </BasicSquareBtn>
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
                            <LTImg/>

                            <SizeBox h={30}/>
                            <PerBorder>
                                {barValue} %
                            </PerBorder>

                            <SizeBox h={10}/>
                            <PercentBar value={barValue} onChange={onChangeBar}
                                        step={0.1} min={0} max={50}/>

                            <LTVImg/>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <Title>
                                Health Factor

                                <SizeBox w={5}/>
                                <ToolTip title={'Health Factor: '}>
                                    Your collateral X Max LTV Short / Token value
                                </ToolTip>
                            </Title>

                            <SizeBox h={60}/>
                            <div className={'f-row a-center'}>
                                <Heart/>

                                <SizeBox w={16}/>
                                {healthFactor < 10000 ? healthFactor : '0.000'}
                            </div>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <Title>
                                Now Gas Price

                                <SizeBox w={5}/>
                                <ToolTip title={'Estimated Gas fee : '}>
                                    From deposit to withdraw,
                                    each network usage fee you use
                                    will be calculated differently
                                    depending on the overall network
                                    (currently Ethereum) usage.
                                </ToolTip>
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