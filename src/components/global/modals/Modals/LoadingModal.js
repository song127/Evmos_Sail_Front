import styled from 'styled-components';
import ModalWrapper from "./ModalWrapper";
import SizeBox from "../../../utils/blocks/SizeBox";
import {useDispatch} from "react-redux";
import {ReactComponent as Logo} from "../../../../assets/icons/icon-logo.svg";
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import {COLORS as c} from "../../../../styles/colors";

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

function LoadingModal({...props}) {
    return (
        <ModalWrapper>
            <Logo/>

            <SizeBox h={30}/>
            <BorderLinearProgress/>

            <SizeBox h={30}/>
            <p style={{color: 'white', fontSize: '20px', fontWeight: '400'}}>
                Now We are Sailing ...
            </p>

            <SizeBox h={100}/>
        </ModalWrapper>
    );
}

export default LoadingModal;