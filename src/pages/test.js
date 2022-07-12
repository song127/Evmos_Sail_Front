import styled from 'styled-components';
import {COLORS as c} from "../styles/colors";
import SquareBtn from "../components/global/SquareBtn";
import SizeBox from "../components/utils/blocks/SizeBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
`;

function Test() {
    return (
        <Container>
            <SizeBox w={87}>
                <SquareBtn type={1} active={true}>
                    Btn
                </SquareBtn>
            </SizeBox>
        </Container>
    );
}

export default Test;