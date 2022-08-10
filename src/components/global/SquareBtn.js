import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.button`
  pointer-events: ${props => props.active ? 'all' : 'none'};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 100%;
  border: 1.5px ${props => props.bColor} solid;
  background-color: ${props => props.back};
  border-radius: 8px;
  opacity: ${props => props.opacity};
  
  font-family: Montserrat;
  font-size: 12px;
  color: ${props => props.font};
  
  transition: all 0.3s;
  
  &:hover {
    border: 1.5px solid ${c.blue_1};
    background-color: ${c.blue_1};
    color: ${c.white};
  }
`;

const BtnSetting = { // border, font, back
    0: {
        true: [c.blue_2, c.white, c.blue_2],
        false: [c.blue_2, c.white, c.blue_2],
    },
    1: {
        true: [c.blue_2, c.blue_2, c.white],
        false: [c.light_gray, c.light_gray, c.white],
    }
}

// 0 : colored, 1 : un colored
function SquareBtn({type = 0, active = false, onClick, ...props}) {
    const onClicked = active ? onClick : null;
    const bColor = BtnSetting[type][active][0];
    const font = BtnSetting[type][active][1];
    const back = BtnSetting[type][active][2];
    const opacity = active ? null : 0.6;
    return (
        <Container active={active} bColor={bColor} font={font} back={back} onClick={onClicked} opacity={opacity}>
            {props.children}
        </Container>
    );
}

export default SquareBtn;