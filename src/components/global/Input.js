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
  
  &::-webkit-input-placeholder {
    color: ${c.gray_3};
    font-size: 14px;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }
`;

const SmallBtn = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 110px;
  height: 40px;
  border: none;
  border-radius: 8px;

  font-size: 12px;
  color: ${props => props.valid ? c.white : c.gray};

  background-color: ${props => props.valid ? 
          (props.state == BORDER_STATE.COMPLETE ? c.green : c.blue_2) 
          : c.gray_4};

  transition: all 0.4s;
`;

export const BORDER_STATE = {
    DEFAULT: c.gray_4,
    FOCUS: c.blue_1,
    ERROR: c.red,
    COMPLETE: c.green
}

const Input = forwardRef(({
                              state = BORDER_STATE.DEFAULT,
                              disabled = false,
                              input,
                              onChange,
                              holder = 'Input',
                              valid,
                              msg,
                              btnClicked,
                              ...props
                          }, ref) =>
    <InputBoard state={state}>
        <InputBody ref={ref} disabled={disabled} placeholder={holder} defaultValue={input} onChange={onChange}/>
        {msg !== undefined ?
            <>
                <SmallBtn valid={valid} onClick={btnClicked} state={state}>
                    {msg}
                </SmallBtn>
                <SizeBox w={20}/>
            </> : null}
    </InputBoard>
);

export default Input;