import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  width: 100%;
  max-width: 520px;
  height: max-content;
  background-color: ${props => props.back};
  border-radius: 8px;
  padding: 16px 20px;
  
  color: ${props => props.color};
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;

  box-sizing: border-box;
`;

export const COLOR_BOX_TYPES = { // back, font
    NOTICE: ['rgba(68, 61, 246, 0.04)', c.blue_2],
    ERROR: [],
    COMPLETE: [],
    BLUE: [c.blue_2, c.white],
    GREEN: [c.green, c.white],
    YELLOW: [c.red, c.white]
}

function ColorBox({color = COLOR_BOX_TYPES.NOTICE, ...props}) {
    return (
        <Container back={color[0]} color={color[1]}>
            {props.children}
        </Container>
    );
}

export default ColorBox;