import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useLayoutEffect, useState} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";
import RoundTab from "../../../components/global/RoundTab";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {ReactComponent as ETH} from "../../../assets/icons/tokens/icon-eth.svg";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as Heart} from "../../../assets/icons/icon-heart.svg";
import TokenInput from "../../../components/global/TokenInput";
import {Link} from "react-router-dom";

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

    useLayoutEffect(() => {
        dispatch({type: DATA_TYPES.MENU, data: 'asset'})
    }, []);

    return (
        <Container>
            <SizeBox h={148}/>
            <Title>
                Overview
            </Title>

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
                            100.000
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
                            1.5325
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
                            <DAI/>
                        </TokenImg>

                        <SizeBox w={12}/>
                        <Amount>
                            65.000
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
                            1.5311
                        </Amount>
                    </div>
                </ColorBox>

                <SizeBox w={10}/>
                <ColorBox color={c.yellow}>
                    <WhiteInnerText>
                        My Balance
                    </WhiteInnerText>

                    <SizeBox h={14}/>
                    <div className={'row a-center'}>
                        <TokenImg>
                            <DAI/>
                        </TokenImg>

                        <SizeBox w={12}/>
                        <Amount>
                            0.0000
                        </Amount>
                    </div>

                    <SizeBox h={30}/>
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
                        <BottomSubTitle>
                            1 DAI ≈ 0.091 ETH
                        </BottomSubTitle>
                    </div>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'100.000'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        Your LTV
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'12.4142'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        Max LV
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'65.000'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        Health Factor
                    </BottomTitle>

                    <SizeBox h={25}/>
                    <div className={'f-row a-center'}>
                        <Heart/>

                        <SizeBox w={20}/>
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

                    <SizeBox h={55}/>
                    <BottomTitle>
                        Short Token
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'65.000'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    <SizeBox h={10}/>
                    <div className={'f-row j-start'}>
                        <BottomSubTitle>
                            Initial Value : 1DAI ≈ n ETH
                        </BottomSubTitle>
                    </div>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        Current Profit
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'1.5311'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        Accumulated Interest
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'124.1244'}
                                    btn={<Token><ETH/><SizeBox w={10}/>ETH</Token>}/>
                    </SizeBox>

                    {/**/}
                    <SizeBox h={60}/>
                    <BottomTitle>
                        TX Fee
                    </BottomTitle>

                    <SizeBox h={16}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput holder={'0.000'} disabled={true} input={'2.5234'}
                                    btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>
                </BackBoard>
            </div>

            <SizeBox h={100}/>
        </Container>
    );
}

export default CurrentAsset;