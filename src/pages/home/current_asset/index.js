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
  height: 800px;

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
  color: ${c.blue_3};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
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
        if(blockchain.account) {
            const shortData = await dataApi.getShortData(blockchain);
            const colData = await dataApi.getCollateralData(blockchain);
            const ethValue = await getPrice();
            const health = await dataApi.getHealth(blockchain);

            const shoData = shortData[1] / web3.utils.toBN(10).pow(web3.utils.toBN(18));
            const initPrice = shortData[2] / web3.utils.toBN(10).pow(web3.utils.toBN(18));
            const balanceData = await dataApi.getMyDaiBalance(blockchain);
            const subBalance = await dataApi.getDepositDaiBalance(blockchain);

            // daiValue = 1 Dai 당 현재 Eth 가격
            // shoData = 빌린 eth 금액
            // calcValue = 빌린 eth 가 현재 몇 Dai 인지
            const calcValue = (ethValue * shoData).toFixed(14).toString();

            // initPrice = 빌릴 당시 얼마만큼 Dai 가 들었는지
            setCollateral(colData);
            setHealth(health['healthFactor'] / (10**18));
            setShort(shoData);
            setProfit(initPrice - parseFloat(calcValue));
            setMyBalance(balanceData);
            setSubBalance(subBalance);
        }
    }

    useEffect(() => {
        if(blockchain.account) {
            if(short === 0.0) {
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

                    <SizeBox h={35}/>
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

                            <SizeBox h={55}/>
                            <BottomTitle>
                                Collateral
                            </BottomTitle>

                            <SizeBox h={10}/>
                            <div className={'f-row j-end'}>
                                <BottomSubTitle onClick={getPrice}>
                                    {priceIndex === 0 ?
                                        `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :
                                        `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`
                                    }
                                </BottomSubTitle>
                            </div>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={collateral.toFixed(5)}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            {/**/}
                            <SizeBox h={60}/>
                            <BottomTitle>
                                Your LTV
                            </BottomTitle>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={'50'}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            {/**/}
                            <SizeBox h={60}/>
                            <BottomTitle>
                                Max LV
                            </BottomTitle>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={'50'}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>
                        </BackBoard>

                        {/* RIGHT */}
                        <SizeBox w={10}/>
                        <BackBoard>
                            <div className={'f-row  j-end'}>
                                <CustomLink to={'/short'} onClick={() => dispatch({type: DATA_TYPES.TAB, data: 1})}>
                                    Go to Short End
                                </CustomLink>
                            </div>

                            <SizeBox h={55}/>
                            <BottomTitle>
                                Short Token
                            </BottomTitle>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={short}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            <SizeBox h={24}/>
                            {/*<div className={'f-row j-start'}>*/}
                            {/*    <BottomSubTitle onClick={getPrice}>*/}
                            {/*        {priceIndex === 0 ?*/}
                            {/*            `1 DAI ≈ ${daiPrice.toFixed(8)} ETH` :*/}
                            {/*            `1 ETH ≈ ${ethPrice.toFixed(3)} DAI`*/}
                            {/*        }*/}
                            {/*    </BottomSubTitle>*/}
                            {/*</div>*/}

                            {/**/}
                            <SizeBox h={60}/>
                            <BottomTitle>
                                Current Profit
                            </BottomTitle>

                            <SizeBox h={16}/>
                            <SizeBox w={'100%'} h={60}>
                                <TokenInput holder={'0.000'} disabled={true} input={profit}
                                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                            </SizeBox>

                            {/**/}
                            <SizeBox h={65}/>
                            <BottomTitle>
                                Health Factor
                            </BottomTitle>

                            <SizeBox h={25}/>
                            <div className={'f-row a-center'}>
                                <Heart/>

                                <SizeBox w={20}/>
                                {health}
                            </div>

                            {/**/}
                            {/*<SizeBox h={60}/>*/}
                            {/*<BottomTitle>*/}
                            {/*    Accumulated Interest*/}
                            {/*</BottomTitle>*/}

                            {/*<SizeBox h={16}/>*/}
                            {/*<SizeBox w={'100%'} h={60}>*/}
                            {/*    <TokenInput holder={'0.000'} disabled={true} input={'124.1244'}*/}
                            {/*                btn={<Token><ETH/><SizeBox w={10}/>ETH</Token>}/>*/}
                            {/*</SizeBox>*/}

                            {/*/!**!/*/}
                            {/*<SizeBox h={60}/>*/}
                            {/*<BottomTitle>*/}
                            {/*    TX Fee*/}
                            {/*</BottomTitle>*/}

                            {/*<SizeBox h={16}/>*/}
                            {/*<SizeBox w={'100%'} h={60}>*/}
                            {/*    <TokenInput holder={'0.000'} disabled={true} input={'2.5234'}*/}
                            {/*                btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>*/}
                            {/*</SizeBox>*/}
                        </BackBoard>
                    </div>

                    <SizeBox h={100}/>
                </Container>
            }
        </>
    );
}

export default CurrentAsset;