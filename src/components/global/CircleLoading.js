import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';

function CircleLoading() {
    return (
        <>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: '#308fe8',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
            />
        </>
    );
}
export default CircleLoading;