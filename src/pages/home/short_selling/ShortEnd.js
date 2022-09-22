import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import {CompleteTypes} from "./index";
import {useEffect, useState} from "react";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import BorderButton from "../../../components/global/BorderButton";
import {ReactComponent as Heart} from "../../../assets/icons/icon-green_heart.svg";
import {useSelector} from "react-redux";
import ActionsAPI from "../../../network/ActionsAPI";
import DataApi from "../../../network/DataApi";
import ToolTip from "../../../components/global/ToolTip";
import Token from "../../../components/global/Token";
import H5 from "../../../components/utils/texts/H5";
import Sub1 from "../../../components/utils/texts/Sub1";
import Spacer from "../../../components/utils/blocks/Spacer";
import SubValueBackBoard from "../../../components/global/SubValueBackBoard";
import H4 from "../../../components/utils/texts/H4";
import GasTracker from "../../../components/global/GasTracker";
import Body1 from "../../../components/utils/texts/Body1";
import SettingToolTip from "../../../components/global/SettingToolTip";
import {LOG} from "../../../styles/utils";

const Backboard_1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 100%;
  height: max-content;

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
  height: max-content;

  background-color: ${c.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 37px 60px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  
  width: max-content;
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

const DashedDivider = styled.div`
  width: 100%;
  height: 0px;
  border-top: 1.5px dashed ${c.gray_2};
`;

const itemList = ['DAI'];

const shorItemList = ['ETH'];

function ShortEnd({setLoading, setTitle, setContent, setLink, setModal, setType, setLoadingModal}) {
    const blockchain = useSelector(state => state.blockchain);
    const tab = useSelector(state => state.data.tab);
    let mounted = true;

    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const [myBalance, setMyBalance] = useState(0.0);

    const [valid, setIsValid] = useState(false);
    const [profit, setProfit] = useState(0.0);
    const [interest, setInterest] = useState(0.0);
    const [nowCollateral, setNowCollateral] = useState(0.0);
    const [healthFactor, setHealthFactor] = useState(0.0);

    const [slippageIndex, setSlippageIndex] = useState(0);

    const shortEndHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.shortEndW(blockchain);
        if (result) {
            setTitle('Successfully completed Short end');
            setContent('Short end requirement has been sent to our server successfully.\n' +
                'Good to go, bro!');
            setLink('/short');
            modalHandler();
        } else {
            setTitle('Short End Failed');
            setContent('Please short end again\n');
            setLink(undefined);
            modalHandler();
        }
        setLoadingModal(false);
    }

    const modalHandler = () => {
        setModal(true);
        setType(CompleteTypes.SHORT_END);
    }

    const [priceIndex, setPriceIndex] = useState(1);
    const [daiPrice, setDaiPrice] = useState(0.0);
    const [ethPrice, setEthPrice] = useState(0.0);
    const getPrice = async () => {
        const daiP = await dataApi.getDaiEthRate(blockchain, 0);
        const ethP = await dataApi.getDaiEthRate(blockchain, 1);
        if(!mounted) { return }
        setDaiPrice(daiP);
        setEthPrice(ethP);

        setPriceIndex(priceIndex === 0 ? 1 : 0);

        return ethP;
    }

    const getDatas = async () => {
        if(!mounted) { return }
        const shortData = await dataApi.getShortData(blockchain);
        const myBalance = await dataApi.getDepositDaiBalance(blockchain);
        const ethValue = await getPrice();
        if(parseInt(shortData[1]) != 0) {
            const colData = await dataApi.getCollateralData(blockchain);
            const health = await dataApi.getHealth(blockchain);

            const shoData = shortData[1] / blockchain.web3.utils.toBN(10).pow(blockchain.web3.utils.toBN(18));
            const initPrice = shortData[2] / blockchain.web3.utils.toBN(10).pow(blockchain.web3.utils.toBN(18));

            const calcValue = (ethValue * shoData).toFixed(14).toString();

            if(!mounted) { return }
            setIsValid(true);
            setProfit(initPrice - parseFloat(calcValue));
            setNowCollateral(colData);
            setHealthFactor(health['healthFactor'] / (10**18));
        } else {
            if(!mounted) { return }
            setIsValid(false);
            setProfit(0);
            setInterest(0);
            setNowCollateral(0);
            setHealthFactor(0);
        }
        setMyBalance(myBalance);
    }

    useEffect(async () => {
        if(blockchain.account) {
            await getDatas().then(() => {
                if(!mounted) { return }
                setLoading(false);
            });
        }
        return () => {
            mounted = false;
        }
    }, [blockchain.account, tab]);

    return (
        <>
            <SizeBox h={30}/>
            <div className={`all-f-row`}>
                <div className={'all-f-column'}>
                    <Backboard_1>
                        <div className={'f-row a-center j-end'}>
                            <SettingToolTip slip={slippageIndex} setSlip={setSlippageIndex}/>
                        </div>

                        <SizeBox h={40}/>
                        <H5>
                            Current Profit
                        </H5>

                        <SizeBox h={12}/>
                        <SizeBox w={'100%'} h={60}>
                            <TokenInput
                                input={profit} disabled={true}
                                state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                                btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                        </SizeBox>

                        <SizeBox h={12}/>
                        <div className={'f-row'}>
                            <SubTitle onClick={getPrice}>
                                {priceIndex === 0 ?
                                    `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :
                                    `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                                }
                            </SubTitle>
                        </div>

                        <SizeBox h={50}/>
                        <DashedDivider/>

                        <SizeBox h={50}/>
                        <div className={'f-row a-center'}>
                            <Body1>
                                Accumulated Interest
                            </Body1>

                            <Spacer/>
                            <DAI/>

                            <SizeBox w={8}/>
                            <Body1>
                                0.0
                            </Body1>
                        </div>

                        <SizeBox h={20}/>
                        <div className={'f-row a-center'}>
                            <Body1>
                                Your Collateral
                            </Body1>

                            <Spacer/>
                            <DAI/>

                            <SizeBox w={8}/>
                            <Body1>
                                {nowCollateral.toFixed(1)}
                            </Body1>
                        </div>

                        <SizeBox h={130}/>
                        <SizeBox w={'100%'} h={60}>
                            <BasicSquareBtn active={valid} onClick={shortEndHandler}>
                                Short End
                            </BasicSquareBtn>
                        </SizeBox>

                        <SizeBox h={37}/>
                    </Backboard_1>
                </div>

                <SizeBox w={30}/>
                <div className={'all-f-column j-start'}>
                    <SubValueBackBoard style={{padding: '60px'}}>
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
                    <Backboard_2>
                        <div className={'f-row a-center'}>
                            <H5>
                                Health Factor
                            </H5>

                            <SizeBox w={5}/>
                            <ToolTip title={'Health Factor: '}>
                                Your collateral X Max LTV Short / Token value
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
                                Established LTV
                            </H5>

                            <SizeBox w={5}/>
                            <ToolTip title={'Established LTV: '}>
                                Your collateral X Max LTV Short / Token value
                            </ToolTip>

                            <Spacer/>
                            <H4 color={c.gray_2}>
                                0.0 %
                            </H4>
                        </div>
                    </Backboard_2>

                    <SizeBox h={20}/>
                    <Backboard_2>
                        <GasTracker/>
                    </Backboard_2>
                </div>
            </div>
        </>
    );
}

export default ShortEnd;