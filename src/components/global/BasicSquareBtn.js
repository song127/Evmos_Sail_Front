import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.button`
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
  font-size: 12px;
  color: ${c.gray_3};

  transition: all 0.3s;

  ${props => props.active ? `
  background-color: ${c.blue_2};
  color: ${c.white};
  &:hover {
    opacity: 1.2;
  }
  ` : {}}
`;

function BasicSquareBtn({active = false, onClick, ...props}) {
    return (
        <Container active={active.toString()} onClick={onClick}>
            {props.children}
        </Container>
    );
}

export default BasicSquareBtn;