import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";
import {ReactComponent as Setting} from "../../assets/icons/icon-setting.svg";
import {useState} from "react";
import ToolTip from "./ToolTip";
import SizeBox from "../utils/blocks/SizeBox";
import Visibility from "../utils/blocks/Visibility";
import Sub1 from "../utils/texts/Sub1";
import Sub3 from "../utils/texts/Sub3";
import {FadeInTopDownAni} from "../utils/actions/Animations";

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
`;

const Board = styled.div`
  position: relative;
  left: -86%;
  
  width: max-content;
  
  background: ${c.background};
  border: 1px solid #E9E9EE;
  box-sizing: border-box;
  padding: 24px;
  box-shadow: 0px 4px 24px rgba(47, 47, 54, 0.12);
  border-radius: 16px;

  animation: ${FadeInTopDownAni} 0.3s;
`;

const RadioSelector = styled.div`
  box-sizing: border-box;

  position: relative;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  
  width: 21px;
  height: 21px;
  background: ${c.white};
  border: 1px solid ${p => p.selected ? c.blue_2 : c.gray_3};
  border-radius: 100%;
  
  transition: all 0.2s;
`;

const RadioSelectorIn = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  
  width: 10px;
  height: 10px;
  
  background: ${p => p.selected ? c.blue_2 : c.white};
  border-radius: 100%;

  transition: all 0.2s;
`;

function SettingToolTip({slip, setSlip, ...props}) {
    const [active, setActive] = useState(false);

    return (
        <Wrapper>
            <Setting style={{cursor: 'pointer'}}
                onClick={() => setActive(value => !value)}/>
            <Container>
                <Visibility visibility={active}>
                    <Board>
                        <div className={'f-row a-center'}>
                            <Sub1>
                                Slippage Setting
                            </Sub1>

                            <SizeBox w={8}/>
                            <ToolTip title={'Slippage Tolerance :'}>
                                Your transaction will revert if the price changes unfavorably by more than this percentage.
                            </ToolTip>
                        </div>

                        <SizeBox h={32}/>
                        <div className={'f-row a-center'} onClick={() => setSlip(0)}>
                            <RadioSelector selected={slip === 0}>
                                <RadioSelectorIn selected={slip === 0}/>
                            </RadioSelector>

                            <SizeBox w={8}/>
                            <Sub3>
                                1%
                            </Sub3>
                        </div>

                        <SizeBox h={14}/>
                        <div className={'f-row a-center'} onClick={() => setSlip(1)}>
                            <RadioSelector selected={slip === 1}>
                                <RadioSelectorIn selected={slip === 1}/>
                            </RadioSelector>

                            <SizeBox w={8}/>
                            <Sub3>
                                3%
                            </Sub3>
                        </div>
                    </Board>
                </Visibility>
            </Container>
        </Wrapper>
    );
}

export default SettingToolTip;