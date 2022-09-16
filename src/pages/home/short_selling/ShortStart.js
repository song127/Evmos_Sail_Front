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
import Token from "../../../components/global/Token";
import SubValueBackBoard from "../../../components/global/SubValueBackBoard";
import H5 from "../../../components/utils/texts/H5";
import Sub1 from "../../../components/utils/texts/Sub1";
import Spacer from "../../../components/utils/blocks/Spacer";
import SettingToolTip from "../../../components/global/SettingToolTip";
import H4 from "../../../components/utils/texts/H4";
import GasTracker from "../../../components/global/GasTracker";
import Sub2 from "../../../components/utils/texts/Sub2";
import {LOG} from "../../../styles/utils";

const Backboard_1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 500px;
  height: max-content;

  background-color: ${c.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 46px 60px;
`;

// Sub
const Backboard_2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 500px;
  height: max-content;

  background-color: ${c.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 37px 60px;
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

  color: ${c.black};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 600;
  line-height: 17px;
`;

const LTImg = styled(LT)`
  position: absolute;

  top: 300px;
  right: 103px;
`;

const LTVImg = styled(MaxLTV)`
  position: absolute;

  top: 420px;
  right: 189px;
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
    const dispatch = useDispatch();

    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const blockchain = useSelector(state => state.blockchain);
    const tab = useSelector(state => state.data.tab);
    let mounted = true;

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
        if(e.target.value === '' || e.target.value === 'NaN' || parseFloat(e.target.value) < myBalance) {
            setCollateralToken(e.target.value);
        } else {
            setCollateralToken(myBalance.toString());
        }
    }
    const macroHandler = (value) => {
        setRatioValue(value);
        const collateralBalance = (myBalance * value / 100).toString();
        setCollateralToken(collateralBalance);
    }

    useEffect(() => {
        if(collateralToken.includes('e')) {
            setCollateralToken('0.0000000');
            return;
        }
        if(collateralToken === '0.0000000') { return }
        if (actionApi.checkNumber(dataApi.toFixed(collateralToken))) {
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
        const data = (parseFloat(collateralToken) * (daiPrice / (10**18)) * barValue / 100).toString();
        if (data !== 'NaN') {
            const fixed = parseFloat(data).toFixed(14).toString();
            setShortToken(fixed);
        } else {
            setShortToken('');
        }
    }, [collateralToken]);

    useEffect(() => {
        const data = (parseFloat(collateralToken) * (daiPrice / (10**18)) * barValue / 100).toString();
        if (data !== 'NaN') {
            const fixed = parseFloat(data).toFixed(14).toString();
            setShortToken(fixed);
        } else {
            setShortToken('');
        }
    }, [barValue]);

    const checkValid = () => {
        const colValid = actionApi.checkNumber(dataApi.toFixed(collateralToken));
        const shortValid = actionApi.checkNumber(dataApi.toFixed(shortToken));

        let cValue = false;
        let sValue = false;
        if(parseFloat(collateralToken) && parseFloat(shortToken)) {
            cValue = parseFloat(collateralToken) !== 0;
            sValue = parseFloat(shortToken) !== 0;
        }

        return (colValid && shortValid) || (cValue && sValue);
    }

    useEffect(() => {
        setIsValid(checkValid());
    }, [collateralToken, shortToken]);

    // datas
    const [healthFactor, setHealthFactor] = useState(0);
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
            setContent('Please Approve To Aave Borrow Contract Again\n');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const shortStartHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.shortStartW(blockchain, collateralToken, shortToken);
        if (result) {
            setTitle('Short start completed successfully');
            setContent('Short Start requirement has been sent to our server successfully.\nGood to go, bro!');
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
    const [daiSwapPrice, setSwapDaiPrice] = useState(0.0);
    const [daiPrice, setDaiPrice] = useState(0.0);
    const [ethPrice, setEthPrice] = useState(0.0);
    const getPrice = async () => {
        const daiP = await dataApi.getDaiEthRate(blockchain, 0);
        const ethP = await dataApi.getDaiEthRate(blockchain, 1);

        if(!mounted) { return }
        setSwapDaiPrice(daiP);
        setEthPrice(ethP);

        setPriceIndex(priceIndex === 0 ? 1 : 0);
    }

    const getDatas = async () => {
        if (blockchain.account) {
            const daiPriceData = await dataApi.getTokenPrice(blockchain, TokenAddress.DAI);
            const shorted = await dataApi.getShortData(blockchain);
            const myBalance = await dataApi.getDepositDaiBalance(blockchain);
            await getPrice();
            const health = await dataApi.getHealth(blockchain);
            const apyEth = await dataApi.getApyETH(blockchain);

            if(!mounted) { return }
            setDaiPrice(parseFloat(daiPriceData));
            setMyBalance(myBalance);
            setApy(apyEth);
            if(parseFloat(shorted[1]) !== 0.0) {
                setHealthFactor(health['healthFactor'] / (10 ** 18));
            } else {
                setHealthFactor(0);
            }

            setApproveLoading(true);
            if (await dataApi.isApprovedBorrowEth(blockchain)) {
                if(!mounted) { return }
                setApproveCount(1);
            }
            if (await dataApi.isApprovedAavePool(blockchain)) {
                if(!mounted) { return }
                setApproveCount(1);
            }
            if (await dataApi.isApprovedUniSwap(blockchain)) {
                if(!mounted) { return }
                setApproveCount(3);
            }
            if(!mounted) { return }
            setApproveLoading(false);
        }
    }

    useEffect(() => {
        if (blockchain.account) {
            getDatas().then(() => {
                if(mounted) {
                    setLoading(false);
                }
            });
        }

        return () => {
            mounted = false;
        }
    }, [blockchain.account, tab]);

    useEffect(async () => {
        dispatch({type: DATA_TYPES.MENU, data: 'short'})
    }, []);

    return (
        <>
            {/* LEFT */}
            <SizeBox h={30}/>
            <div className={`all-f-row`}>
                <div className={'f-column'}>
                    <SubValueBackBoard style={{maxWidth: '500px'}}>
                        <H5>
                            Subwallet Balance
                        </H5>

                        <SizeBox h={16}/>
                        <div className={'f-row a-center'}>
                            <Sub1>
                                Available To Short
                            </Sub1>

                            <Spacer/>
                            <DAI/>

                            <SizeBox w={8}/>
                            <H5>
                                {myBalance.toFixed(4)}
                            </H5>
                        </div>
                    </SubValueBackBoard>

                    <SizeBox h={20}/>
                    <Backboard_1>
                        <div className={'f-row j-end'}>
                            <SettingToolTip slip={slippageIndex} setSlip={setSlippageIndex}/>
                        </div>

                        <SizeBox h={20}/>
                        <H5>
                            Set Collateral
                        </H5>

                        <SizeBox h={24}/>
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

                        <SizeBox h={38}/>
                        <H5>
                            Set Short Token Ratio
                        </H5>

                        <SizeBox h={24}/>
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

                        <SizeBox h={10}/>
                        <div className={'f-row'}>
                            <SubTitle onClick={getPrice}>
                                {priceIndex === 0 ?
                                    `1 DAI ≈ ${daiSwapPrice.toFixed(8)} ETH` :
                                    `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                                }
                            </SubTitle>
                        </div>

                        <SizeBox h={62}/>
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
                                            {
                                                isValid ? 'Short Start' : 'Enter an amount'
                                            }
                                        </BasicSquareBtn>
                                    </>
                            }
                        </SizeBox>
                    </Backboard_1>
                </div>

                {/* RIGHT */}
                <SizeBox w={20}/>
                <SizeBox w={500} h={'100%'}>
                    <div className={'all-f-column j-space'}>
                        <Backboard_2>
                            <H5>
                                My LTV
                            </H5>

                            <LTImg/>

                            <SizeBox h={50}/>
                            <PerBorder>
                                {barValue} %
                            </PerBorder>

                            <SizeBox h={10}/>
                            <PercentBar value={barValue} onChange={onChangeBar}
                                        step={0.1} min={0} max={50}/>

                            <SizeBox h={10}/>
                            <div className={'f-row'}>
                                <Sub2 color={c.green}>
                                    Safer
                                </Sub2>

                                <Spacer/>
                                <Sub2 color={c.red}>
                                    Risker
                                </Sub2>
                            </div>

                            <LTVImg/>

                            <SizeBox h={54}/>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <div className={'f-row a-center'}>
                                <H5>
                                    Health Factor
                                </H5>

                                <SizeBox w={5}/>
                                <ToolTip title={'Health Factor: '}>
                                    Health factor= Σ collateral in ETH * Liquidation Threshold / Σ Short Token value in ETH.
                                    Auto protecting asset function runs at ≈ 1.0
                                </ToolTip>

                                <Spacer/>
                                <Heart/>

                                <SizeBox w={16}/>
                                <H4 color={c.green}>
                                    {healthFactor.toFixed(4)}
                                </H4>
                            </div>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <div className={'f-row a-center'}>
                                <H5>
                                    APY (Variable, Short token)
                                </H5>

                                <SizeBox w={5}/>
                                <ToolTip title={'APY type variable :'}>
                                    The variable rate is the rate based on the offer and demand in our protocol.
                                    <br/>
                                    Also it will change over the time and could be optimal rate depending on market conditions.
                                </ToolTip>

                                <Spacer/>
                                <H4 color={apy > 0 ? c.font_color : c.gray_2}>
                                    {apy.toFixed(2)} %
                                </H4>
                            </div>
                        </Backboard_2>

                        <SizeBox h={20}/>
                        <Backboard_2>
                            <GasTracker/>
                        </Backboard_2>
                    </div>
                </SizeBox>
            </div>
        </>
    );
}

export default ShortStart;