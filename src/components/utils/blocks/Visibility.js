import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: ${({visibility}) => visibility ? 'flex' : 'none'};
`;

function Visibility({visibility = false, ...props}) {
    return (
        <Container visibility={visibility}>
            {props.children}
        </Container>
    );
}

export default Visibility;