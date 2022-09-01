import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  
  width: 100%;

  background: ${c.blue_4};
  border-radius: 16px;
  padding: 32px 58px;
`;

function SubValueBackBoard({...props}) {
    return (
      <Container style={props.style}>
          {props.children}
      </Container>
    );
}

export default SubValueBackBoard;