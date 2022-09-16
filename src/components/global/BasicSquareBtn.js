import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.button`
  pointer-events: ${props => props.active ? 'all' : 'none'};
  cursor: ${props => props.active ? 'pointer' : null};

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  border: none;
  background-color: ${c.gray_4};
  border-radius: 8px;
  opacity: 0.95;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: ${c.gray};

  transition: all 0.3s;

  ${props => props.active ? `
  background-color: ${c.blue_2};
  color: ${c.white};
  &:hover {
    background-color: ${c.blue_1};
  }
  ` : {}}
`;

function BasicSquareBtn({active = false, onClick = () => {}, ...props}) {
    return (
        <Container active={active} onClick={onClick}>
            {props.children}
        </Container>
    );
}

export default BasicSquareBtn;