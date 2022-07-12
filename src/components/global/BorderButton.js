import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";

const Box = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;
  border-radius: 8px;
  border: 1.5px solid ${c.gray_4};
  background-color: ${p => p.selected ? c.light_gray : c.white};

  color: ${c.gray};
  font-size: 14px;
  font-weight: 500;

  transition: 0.4s;

  &:hover {
    background-color: ${p => p.selected ? c.light_gray : c.gray_4};
  }
`;

function BorderButton({selected, onClick, ...props}) {
    return (
        <Box selected={selected} onClick={onClick}>
            {props.children}
        </Box>
    );
}

export default BorderButton;