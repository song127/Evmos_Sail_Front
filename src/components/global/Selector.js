import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";
import {useEffect, useRef, useState} from "react";
import {ReactComponent as DownArrow} from "../../assets/icons/icon-down-arrow.svg";
import Spacer from "../utils/blocks/Spacer";
import SizeBox from "../utils/blocks/SizeBox";
import {ReactComponent as ETH} from "../../assets/icons/tokens/icon-eth.svg";

const Container = styled.div`
  pointer-events: ${p => p.disable ? 'none' : 'auto'};
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 100%;
  
  position: relative;
`;

const SelectedValue = styled.div`
  cursor: pointer;
  
  display: flex;
  flex-direction: row;
  align-items: center;

  width: calc(100%);
  height: 50px;

  line-height: 50px;
  font-size: 14px;
  text-align: left;

  padding-left: 16px;
  border-radius: 10px;
  border: none;

  position: relative;
  transition: 0.2s;

  &:hover {
    background: ${c.gray_4};
  }
`;

const DownArrowC = styled(DownArrow)`
  top: -4px;
  transition: 0.2s;
  transform: rotate(${props => props.active ? '0deg' : '-180deg'});
`;

const OptionWrapper = styled.div`
  width: 100%;
  max-height: 0px;

  opacity: 0;
  overflow: auto;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: ${c.white};
  transition: 0.2s;
  position: absolute;
  top: 55px;

  ${props => props.active ? 'opacity: 1;\n  max-height: 130px;\n  z-index: 1;' : null}
  &::-webkit-scrollbar {
    width: 3px;
    background: ${c.gray_4};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${c.blue_2};
    border-radius: 3px;
  }
`;

const OptionItem = styled.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  flex-direction: row;

  width: calc(100%);
  height: 43px;
  padding-left: 16px;
  background-color: ${props => props.selected ? c.gray_4 : 'transparent'};

  line-height: 43px;
  font-size: 14px;
  color: #000000;
  text-align: left;

  transition: 0.2s;

  &:hover {
    background-color: ${c.gray_4};
  }
`;

function Selector({list, index = 0, setIndex, disable = false, ...props}) {
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    const clickEvent = (e) => {
        if(ref.current != null) {
            if (!ref.current.contains(e.target)) {
                setActive(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickEvent);

        return () => {
            window.removeEventListener('click', clickEvent);
        }
    }, []);

    return (
        <Container ref={ref} disable={disable}>
            <SelectedValue ref={ref} onClick={() => setActive(!active)}>
                {list[index] === 'ETH' ? <ETH/> : null}
                <SizeBox w={10}/>
                {list[index]}
                <Spacer/>
                <DownArrowC active={active}/>
                <SizeBox w={20}/>
            </SelectedValue>
            <OptionWrapper active={active}>
                {list.map((value, idx) => (
                    <OptionItem key={idx} selected={index === idx} onClick={() => setIndex(idx)}>
                        {value === 'ETH' ? <ETH/> : null}
                        <SizeBox w={10}/>
                        {value}
                    </OptionItem>
                ))}
            </OptionWrapper>
        </Container>
    );
}

export default Selector;