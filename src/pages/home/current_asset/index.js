import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useState} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../../components/utils/actions/Animations";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {ReactComponent as ETH} from "../../../assets/icons/tokens/icon-eth.svg";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as Heart} from "../../../assets/icons/icon-heart.svg";
import TokenInput from "../../../components/global/TokenInput";
import {Link} from "react-router-dom";
import Loading from "../../Loading";
import DataApi from "../../../network/DataApi";
import Web3 from "web3";
import H5 from "../../../components/utils/texts/H5";
import Sub1 from "../../../components/utils/texts/Sub1";
import Spacer from "../../../components/utils/blocks/Spacer";
import SubValueBackBoard from "../../../components/global/SubValueBackBoard";
import Token from "../../../components/global/Token";
import ToolTip from "../../../components/global/ToolTip";
import Sub2 from "../../../components/utils/texts/Sub2";
import Sub3 from "../../../components/utils/texts/Sub3";
import Body1 from "../../../components/utils/texts/Body1";

const web3 = new Web3('');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1060px;
  height: 100%;

  animation: ${ContentLoaded} 1.0s;
  animation-fill-mode: forwards;
`;

const ColorBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 340px;
  height: 300px;

  background-color: ${p => p.color};
  border-radius: 16px;
  padding: 76px 60px;
  box-sizing: border-box;
`;

const BackBoard = styled.div`
  width: 518px;
  height: 750px;

  background-color: ${c.white};
  border-radius: 16px;
  padding: 50px 60px;
  box-sizing: border-box;
`;

const Title = styled.div`
  align-self: start;

  color: ${c.font_color};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
`;

const WhiteInnerText = styled.div`
  font-weight: 400;
  font-family: Montserrat;
  font-size: 12px;
  color: ${c.white};
`;

const TokenImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  background-color: ${c.white};
  border-radius: 8px;
  padding: 6px;
  box-sizing: border-box;
`;

const Amount = styled.div`
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 700;
  color: ${c.white};
`;

const CustomLink = styled(Link)`
  color: ${c.blue_2};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-decoration-line: underline;
`;

const BottomTitle = styled.div`
  width: max-content;
  height: max-content;

  color: ${c.font_color};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
`;

const BottomSubTitle = styled.div`
  cursor: pointer;

  width: max-content;
  height: max-content;

  color: ${c.black};
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 600;
`;

const DashedDivider = styled.div`
  width: 100%;
  height: 0px;
  border-top: 1.5px dashed ${c.gray_2};
`;

function CurrentAsset() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const blockchain = useSelector(state => state.blockchain);
    const dataApi = new DataApi();

    useLayoutEffect(() => {
        dispatch({type: DATA_TYPES.MENU, data: 'asset'})
    }, []);

    const [loading, setLoading] = useState(true);

    const [collateral, setCollateral] = useState(0.0);
    const [health, setHealth] = useState(0.0);
    const [short, setShort] = useState(0.0);
    const [profit, setProfit] = useState(0.0);
    const [myBalance, setMyBalance] = useState(0.0);
    const [subBalance, setSubBalance] = useState(0.0);

    const [priceIndex, setPriceIndex] = useState(0);
    const [daiPrice, setDaiPrice] = useState(0.0);
    const [ethPrice, setEthPrice] = useState(0.0);
    const getPrice = async () => {
        const daiP = await dataApi.getDaiEthRate(blockchain, 0);
        const ethP = await dataApi.getDaiEthRate(blockchain, 1);
        setDaiPrice(daiP);
        setEthPrice(ethP);

        setPriceIndex(priceIndex === 1 ? 0 : 1);

        return ethP;
    }

    const getDatas = async () => {
        if (blockchain.account) {
            const shortData = await dataApi.getShortData(blockchain);
            const ethValue = await getPrice();
            if (parseInt(shortData[1]) != 0) {
                const colData = await dataApi.getCollateralData(blockchain);
                const health = await dataApi.getHealth(blockchain);

                const shoData = shortData[1] / web3.utils.toBN(10).pow(web3.utils.toBN(18));
                const initPrice = shortData[2] / web3.utils.toBN(10).pow(web3.utils.toBN(18));

                // daiValue = 1 Dai 당 현재 Eth 가격
                // shoData = 빌린 eth 금액
                // calcValue = 빌린 eth 가 현재 몇 Dai 인지
                const calcValue = (ethValue * shoData).toFixed(14).toString();

                // initPrice = 빌릴 당시 얼마만큼 Dai 가 들었는지
                setCollateral(colData);
                setHealth(health['healthFactor'] / (10 ** 18));
                setShort(shoData);
                setProfit(initPrice - parseFloat(calcValue));
            }
            const balanceData = await dataApi.getMyDaiBalance(blockchain);
            const subBalance = await dataApi.getDepositDaiBalance(blockchain);
            setMyBalance(balanceData);
            setSubBalance(subBalance);
        }
    }

    useEffect(() => {
        if (blockchain.account) {
            if (short === 0.0) {
                getDatas().then(() => {
                    setLoading(false);
                });
            }
        }
    }, [blockchain]);

    return (
        <>
            {loading ? <Loading/> :
                <Container>
                    <SizeBox h={148}/>
                    <Title>
                        Overview
                    </Title>

                    {/* TOP */}
                    <SizeBox h={20}/>
                    <div className={'f-row j-space'}>
                        <ColorBox color={c.blue_3}>
                            <WhiteInnerText>
                                Collateral
                            </WhiteInnerText>

                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <DAI/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {collateral.toFixed(4)}
                                </Amount>
                            </div>

                            <SizeBox h={30}/>
                            <WhiteInnerText>
                                Health Factor
                            </WhiteInnerText>
                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <Heart/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {health.toFixed(4)}
                                </Amount>
                            </div>
                        </ColorBox>

                        <SizeBox w={10}/>
                        <ColorBox color={c.green}>
                            <WhiteInnerText>
                                Short Token
                            </WhiteInnerText>

                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <ETH/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {short}
                                </Amount>
                            </div>

                            <SizeBox h={30}/>
                            <WhiteInnerText>
                                Current Profit
                            </WhiteInnerText>
                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <DAI/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {profit.toFixed(4)}
                                </Amount>
                            </div>
                        </ColorBox>

                        <SizeBox w={10}/>
                        <ColorBox color={c.yellow}>
                            <WhiteInnerText>
                                My Wallet Balance
                            </WhiteInnerText>

                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <DAI/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {myBalance.toFixed(4)}
                                </Amount>
                            </div>

                            <SizeBox h={30}/>
                            <WhiteInnerText>
                                My SubWallet Balance
                            </WhiteInnerText>
                            <SizeBox h={14}/>
                            <div className={'row a-center'}>
                                <TokenImg>
                                    <DAI/>
                                </TokenImg>

                                <SizeBox w={12}/>
                                <Amount>
                                    {subBalance.toFixed(4)}
                                </Amount>
                            </div>
                        </ColorBox>
                    </div>

                    <SizeBox h={40}/>
                    <SubValueBackBoard>
                        <H5 color={c.black}>
                            Sub Wallet Balance
                        </H5>

                        <SizeBox h={10}/>
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
                    </SubValueBackBoard>

                    <SizeBox h={40}/>
                    <Title>
                        Details
                    </Title>

                    <SizeBox h={20}/>
                    <div className={'f-row j-space'}>
                        {/* LEFT */}
                        <BackBoard>
                            <div className={'f-row  j-end'}>
                                <CustomLink to={'/short'} onClick={() => dispatch({type: DATA_TYPES.TAB, data: 0})}>
                                    Go to Short Start
                                </CustomLink>
                            </div>

                            <SizeBox h={80}/>
                            <H5 align={'start'}>
                                Collateral
                            </H5>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={collateral.toFixed(5)}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            <SizeBox h={10}/>
                            <div className={'f-row j-start a-center'}>
                                <ToolTip>
                                    Change
                                </ToolTip>

                                <SizeBox w={20}/>
                                <BottomSubTitle onClick={getPrice}>
                                    {priceIndex === 0 ?
                                        `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :
                                        `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                                    }
                                </BottomSubTitle>
                            </div>

                            {/**/}
                            <SizeBox h={60}/>
                            <H5 align={'start'}>
                                My LTV
                            </H5>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={'50'}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            <SizeBox h={10}/>
                            <Body1 align={'start'}>
                                MAX LTV : 0.0 DAI
                            </Body1>

                            <SizeBox h={75}/>
                            <div className={'f-row a-center'}>
                                <H5>
                                    Health Factor
                                </H5>

                                <SizeBox w={8}/>
                                <ToolTip title={'Health'}>
                                    Factor
                                </ToolTip>

                                <Spacer/>
                                <Heart/>
                                <SizeBox w={16}/>
                                <H5>
                                    {health.toFixed(3)}
                                </H5>
                            </div>

                            <SizeBox h={30}/>
                            <div className={'f-row a-center'}>
                                <H5>
                                    APY (Variable)
                                </H5>

                                <SizeBox w={8}/>
                                <ToolTip title={'APY'}>
                                    Variable
                                </ToolTip>

                                <Spacer/>
                                <H5>
                                    {health.toFixed(1)} %
                                </H5>
                            </div>
                        </BackBoard>

                        {/* RIGHT */}
                        <SizeBox w={10}/>
                        <BackBoard>
                            <div className={'f-row  j-end'}>
                                <CustomLink to={'/short'} onClick={() => dispatch({type: DATA_TYPES.TAB, data: 1})}>
                                    Go to Short End
                                </CustomLink>
                            </div>

                            <SizeBox h={80}/>
                            <H5 align={'start'}>
                                Short Token
                            </H5>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={short}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            <SizeBox h={88}/>
                            <H5 align={'start'}>
                                Current Profit
                            </H5>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={profit}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>
                            <SizeBox h={10}/>
                            <div className={'f-row j-start a-center'}>
                                <ToolTip>
                                    Change
                                </ToolTip>

                                <SizeBox w={20}/>
                                <BottomSubTitle onClick={getPrice}>
                                    {priceIndex === 0 ?
                                        `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :
                                        `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                                    }
                                </BottomSubTitle>
                            </div>

                            {/**/}
                            <SizeBox h={40}/>
                            <DashedDivider/>

                            <SizeBox h={40}/>
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
                                    {collateral.toFixed(1)}
                                </Body1>
                            </div>
                        </BackBoard>
                    </div>

                    <SizeBox h={100}/>
                </Container>
            }
        </>
    );
}

export default CurrentAsset;