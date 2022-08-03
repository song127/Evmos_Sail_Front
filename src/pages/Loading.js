import styled from "styled-components";
import {COLORS as c} from "../styles/colors";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import {ReactComponent as Logo} from "../assets/icons/icon-logo.svg";
import SizeBox from "../components/utils/blocks/SizeBox";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width: 300,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 200,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#308fe8',
    },
}));

function Loading() {
    return (
        <div className={'all-f-column a-center j-center'}>
            <SizeBox h={300}/>

            <Logo/>

            <SizeBox h={30}/>
            <BorderLinearProgress />

            <SizeBox h={30}/>
            Now We are Sailing ...
        </div>
    );
}

export default Loading;