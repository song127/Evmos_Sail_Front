import styled from 'styled-components';
import {COLORS as c} from "../../../../styles/colors";

const Temp = styled.div`
    position: absolute;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 100%;
  
  left: 0;
  top: 0;
  background-color: ${c.modal_back};
  
  z-index: 1300;
  overflow: hidden;
  transition: 0.2s;
`;

function ModalWrapper(props) {
    return (
        <Temp>
            <Container>
                {props.children}
            </Container>
        </Temp>
    );
}

export default ModalWrapper;