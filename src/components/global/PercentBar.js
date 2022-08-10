import styled from 'styled-components';
import {COLORS as c} from "../../styles/colors";
import {Slider, SliderThumb} from '@mui/material';
import SizeBox from "../utils/blocks/SizeBox";

const BackBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  width: 100%;
  height: 16px;
  padding-left: 8px;
  box-sizing: border-box;

  border-radius: 32px;
  background: linear-gradient(270deg, #FF6262 0%, #F9CC8A 51.04%, #69CAA1 100%);
`;

function PercentBar({step, min = 0, max = 50, value, onChange, ...props}) {
    return (
        <BackBoard>
            <SizeBox w={'50%'}>
                <SizeBox h={2.5}/>
                <Slider aria-label={'Volume'} value={value}
                        onChange={(e, v) => onChange(v)}
                        defaultValue={0} min={min} max={50}
                        step={1}
                        sx={{
                            backgroundColor: 'transparent',
                            '& .MuiSlider-thumb': {
                                width: 14,
                                height: 14,
                                border: `solid ${c.white} 2px`,
                                borderRadius: '100%',
                                backgroundColor: c.black,
                                boxShadow: 'none',
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: 'transparent'
                            },
                            '& .MuiSlider-track': {
                                border: 'none',
                                backgroundColor: 'transparent'
                            }
                        }}
                />

            </SizeBox>
        </BackBoard>
    );
}

export default PercentBar;