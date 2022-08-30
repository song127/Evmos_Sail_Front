import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";
import {forwardRef} from "react";
import SizeBox from "../utils/blocks/SizeBox";

const InputBoard = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1.5px solid ${props => props.state};

  background-color: ${c.white};
`;

const InputBody = styled.input`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1.5px solid ${props => props.state};

  background-color: ${c.white};
  outline: none;
  border: none;
  width: 100%;
  height: 38px;
  padding: 0px 0px 0px 20px;
  background-color: transparent;
  
  transition: all 0.3s;

  font-weight: 600;
  font-size: 14px;

  &::-webkit-input-placeholder {
    color: ${c.gray_2};
    font-family: Montserrat;
    font-style: normal; 
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

export const TOKEN_INPUT_STATE = {
    DEFAULT: c.gray_3,
    FOCUS: c.blue_1,
}

const TokenInput = forwardRef(({
                                   state = TOKEN_INPUT_STATE.DEFAULT,
                                   disabled = false,
                                   input = '',
                                   onChange = () => {},
                                   holder = 'Input',
                                   btn,
                                   ...props
                               }, ref) =>
    <InputBoard state={state}>
        <InputBody type={'number'}
                   ref={ref} disabled={disabled}
                   placeholder={holder} value={input}
                   onChange={onChange}/>
        {btn !== undefined ?
            <>
                {btn}
                <SizeBox w={10}/>
            </> : null}
    </InputBoard>
);

export default TokenInput;