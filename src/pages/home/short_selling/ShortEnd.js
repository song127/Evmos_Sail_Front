import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import Selector from "../../../components/global/Selector";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import PercentBar from "../../../components/global/PercentBar";
import {MESSAGE_TYPES} from "../../../components/global/ToastMessage";
import SuccessMessageContent from "../../../components/global/SuccessMessageContent";
import {CompleteTypes} from "./index";
import {useState} from "react";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import BorderButton from "../../../components/global/BorderButton";
import {ReactComponent as Gas} from "../../../assets/icons/icon-gas-station.svg";
import {ReactComponent as Heart} from "../../../assets/icons/icon-heart.svg";
import {useSelector} from "react-redux";
import ActionsAPI from "../../../network/ActionsAPI";

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

// Sub
const Backboard_2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 500px;
  height: 200px;

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

function ShortEnd({setTitle, setContent, setLink, setModal, setType, setLoadingModal}) {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();

    const [nowDaiBalance, setNowDaiBalance] = useState(0.091);

    const [profit, setProfit] = useState(1.5311);
    const [interest, setInterest] = useState(124.1244);
    const [nowCollateral, setNowCollateral] = useState(80);

    const [slippageIndex, setSlippageIndex] = useState(0);

    const shortEndHandler = async () => {
        setLoadingModal(true);
        const result = await actionApi.shortEndW(blockchain);
        if (result) {
            setTitle('Successfully completed Short end');
            setContent('Short end requirement has been sent to our server successfully.\n' +
                'Good to go, bro!');
            setLink('/Short');
            modalHandler();
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
        setType(CompleteTypes.SHORT_END);
    }

    return (
        <>
            <SizeBox h={30}/>
            <div className={`row a-center j-start`}>
                <Backboard_1>
                    <Title>
                        Current Profit
                    </Title>

                    <SizeBox h={30}/>
                    <div className={'f-row a-end j-end'}>
                        <SubTitle>
                            1 DAI ≈ {nowDaiBalance} ETH
                        </SubTitle>
                    </div>

                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            input={profit} disabled={true}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    <SizeBox h={48}/>
                    <Title>
                        Accumulated Interest
                    </Title>

                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            input={interest} disabled={true}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

                    <SizeBox h={48}/>
                    <Title>
                        Your Collateral
                    </Title>

                    <SizeBox h={8}/>
                    <SizeBox w={'100%'} h={60}>
                        <TokenInput
                            input={nowCollateral} disabled={true}
                            state={TOKEN_INPUT_STATE.DEFAULT} holder={'0.0000'}
                            btn={<Token><DAI/><SizeBox w={10}/>DAI</Token>}/>
                    </SizeBox>

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

                    <SizeBox h={100}/>
                    <SizeBox w={'100%'} h={60}>
                        <BasicSquareBtn active={true} onClick={shortEndHandler}>
                            short end
                        </BasicSquareBtn>
                    </SizeBox>
                </Backboard_1>

                <SizeBox w={20}/>
                <SizeBox w={500} h={'100%'}>
                    <div className={'all-f-column j-space'}>
                        <Backboard_2>
                            <Title>
                                Total Profit
                            </Title>

                            <SizeBox h={50}/>
                            <div className={'f-row a-center'}>
                                <DAI/>

                                <SizeBox w={10}/>
                                1.5311
                            </div>
                        </Backboard_2>

                        <SizeBox h={15}/>
                        <Backboard_2>
                            <Title>
                                Established LTV
                            </Title>

                            <SizeBox h={50}/>
                            <TokenInput input={12.4142}/>
                        </Backboard_2>

                        <SizeBox h={15}/>
                        <Backboard_2>
                            <Title>
                                Health Factor
                            </Title>

                            <SizeBox h={50}/>
                            <div className={'f-row a-center'}>
                                <Heart/>

                                <SizeBox w={16}/>
                                1.5325
                            </div>
                        </Backboard_2>

                        <SizeBox h={15}/>
                        <Backboard_2>
                            <Title>
                                Gas Fee(Estimated)
                            </Title>

                            <SizeBox h={50}/>
                            <div className={'f-row a-center'}>
                                <Gas/>

                                <SizeBox w={16}/>
                                0.003452
                            </div>
                        </Backboard_2>
                    </div>
                </SizeBox>
            </div>
        </>
    );
}

export default ShortEnd;