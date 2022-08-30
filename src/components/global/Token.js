import styled from "styled-components";
import {COLORS} from "../../styles/colors";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 110px;
  height: 50px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  
  color: ${COLORS.black};
`;

function Token({...props}) {
    return (
        <Container>
            {props.children}
        </Container>
    );
}

export default Token;