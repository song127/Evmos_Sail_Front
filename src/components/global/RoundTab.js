import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";
import RoundBtn from "./RoundBtn";

const BackBoard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 48px;
  border: 2px solid ${c.gray_4};

  width: 100%;
  height: 50px;

  position: relative;
  
  transition: all 0.4s;
`;

const EmptyRoundBtn = styled.button`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 50%;
  height: 100%;

  border-radius: 48px;
  border: none;
  background-color: transparent;

  font-size: 14px;
  color: ${c.gray_3};
`;

function RoundTab({list = [], index = 0, setIndex, ...props}) {
    return (
        <BackBoard>
            {list.map((value, idx) => (
                <EmptyRoundBtn key={idx} onClick={() => setIndex(idx)}>
                    {value}
                </EmptyRoundBtn>
            ))}
            <RoundBtn length={list.length} text={list[index]} index={index}/>
        </BackBoard>
    );
}

export default RoundTab;