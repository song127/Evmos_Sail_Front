import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${({thick}) => `${thick}px`};
  background-color: ${({c}) => c};
`;

function Divider({c, thick, ...props}) { // hr 같은거
    return(
        <Container c={c} thick={thick}/>
    );
}

export default Divider;