import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: ${props => `${100 / props.length}%`};
  height: 50px;
  background-color: ${c.blue_2};
  border-radius: 48px;
  
  color: ${c.white};
  font-weight: 500;
  font-size: 14px;
  
  transform: translateX(${props => `${props.index * 100}%`});
  transition: all 0.3s;

  left: 0;
  position: absolute;
`;

function RoundBtn({length = 0, text = 'NONE', index = 0, ...props}) {
    return (
        <Container length={length} index={index}>
            {text}
        </Container>
    );
}

export default RoundBtn;