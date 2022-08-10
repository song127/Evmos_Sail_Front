import styled from "styled-components";
import {COLORS as c} from "../styles/colors";
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {ReactComponent as Logo} from "../assets/icons/icon-logo.svg";
import SizeBox from "../components/utils/blocks/SizeBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  height: 100vh;
`;

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 10,
    width: 300,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: c.blue_3,
    },
}));

function Loading() {
    return (
        <Container>
            <Logo/>

            <SizeBox h={30}/>
            <BorderLinearProgress/>

            <SizeBox h={30}/>
            Now We are Sailing ...
        </Container>
    );
}

export default Loading;