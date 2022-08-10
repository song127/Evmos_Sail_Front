import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";
import Visibility from "../utils/blocks/Visibility";
import {FadeInAni, FadeInTopDownAni} from "../utils/actions/Animations";
import {useEffect, useState} from "react";
import {ReactComponent as ToolTipIcon} from "../../assets/icons/icon-tooltip.svg";
import {ReactComponent as CornIcon} from "../../assets/icons/icon-tip_corn.svg";
import SizeBox from "../utils/blocks/SizeBox";

const Wrapper = styled.div`
    position: relative;
`;

const Container = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  position: relative;
  z-index: 1004;
  top: -1px;
  left: -10px;

  display: flex;
  flex-direction: column;
  width: 260px;
  height: max-content;

  background-color: ${c.blue_3};
  border-radius: 16px;
  padding: 18px 42px 18px 16px;
  box-sizing: border-box;

  color: ${c.white};
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  white-space: pre-wrap;

  animation: ${FadeInTopDownAni} 0.2s;
`;

const AniWrapper = styled(CornIcon)`
  animation: ${FadeInAni} 0.1s;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;

  line-height: 15px;
  font-weight: 500;
`;

function ToolTip({title, ...props}) {
    const [active, setActive] = useState(false);

    return (
        <Wrapper>
            <Container
                onMouseOver={() => setActive(true)}
                onMouseOut={() => setActive(false)}>
                <ToolTipIcon/>
                <Visibility visibility={active}>
                    <div className={'f-row a-start j-start'}>
                        <AniWrapper/>
                    </div>
                    <Content>
                        <Title>
                            {title}
                        </Title>
                        <SizeBox h={10}/>
                        {props.children}
                    </Content>
                </Visibility>
            </Container>
        </Wrapper>
    );
}

export default ToolTip;