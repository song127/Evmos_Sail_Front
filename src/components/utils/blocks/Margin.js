import styled from "styled-components";

const Container = styled.div`
  display: flex;
  
  margin-left: ${props => `${props.left}px`};
  margin-right: ${props => `${props.right}px`};
`;

function Margin({left = 0, right = 0, ...props}) { // hr 같은거
    return(
        <Container className={props.className} left={left} right={right}>
            {props.children}
        </Container>
    );
}

export default Margin;