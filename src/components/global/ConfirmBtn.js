import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";

const Container = styled.div`
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;

  width: 240px;
  height: max-content;
  
  padding: 12px 30px;
  box-sizing: border-box;
  background-color: ${c.green};
  border-radius: 8px;
  
  text-align: center;
  color: ${c.white};
`;

function ConfirmBtn({content, onClick, ...props}) {
    return (
        <Container onClick={onClick}>
            {content}
        </Container>
    );
}

export default ConfirmBtn;