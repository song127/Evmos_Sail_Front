import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useState, useRef} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../../components/utils/actions/ContentLoaded";
import RoundTab from "../../../components/global/RoundTab";
import SizeBox from "../../../components/utils/blocks/SizeBox";
import {useMediaQuery} from "react-responsive";
import TokenInput, {TOKEN_INPUT_STATE} from "../../../components/global/TokenInput";
import Selector from "../../../components/global/Selector";
import BasicSquareBtn from "../../../components/global/BasicSquareBtn";
import PercentBar from "../../../components/global/PercentBar";
import Visibility from "../../../components/utils/blocks/Visibility";
import ShortStart from "./ShortStart";
import ShortEnd from "./ShortEnd";
import ToastMessage, {MESSAGE_TYPES} from "../../../components/global/ToastMessage";

const Stack = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1020px;

  animation: ${ContentLoaded} 1.0s;
  animation-fill-mode: forwards;
`;

const tabList = [
    'Short Start',
    'Short End',
];

export const CompleteTypes = {
    DEPOSIT: 0,
    WITHDRAW: 1,
    SHORT_START: 2,
    SHORT_END: 3,
    DEPOSIT_TO_SHORT: 4,
};

export const ToastOptions = [
    {
        name: 'Go to Short',
        content: 'The deposit statement has been requested.' +
            'After a few progress, you can check the Sail deposit statement on the Current Asset page.'
    },
    {
        name: 'Confirm',
        content: 'The Withdraw statement you sent has been requested.' +
            'Go to your wallet and check out your wallet balance.'
    },
    {
        name: 'Confirm',
        content: 'Short Start requirement has been sent to our server successfully.' +
            'Good to go, bro!'
    },
    {
        name: 'Go to Asset',
        content: 'Short End statement has been sent to our server successfully.' +
            'Check out your Sail Deposit deposit on the Current Asset page.'
    },
    {
        name: 'Go to Deposit',
        content: 'Our short service could be used after progress of deposit.' +
            'Please go to the Deposit page. '
    },
];

function ShortSelling() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.data.tab);
    const [tabIndex, setTabIndex] = useState(0);

    const isPc = useMediaQuery({
        query: '(min-width: 1080px)'
    });

    useLayoutEffect(() => {
        dispatch({type: DATA_TYPES.MENU, data: 'short'})
    }, []);

    useEffect(() => {
        dispatch({type: DATA_TYPES.TAB, data: tabIndex});
    }, [tabIndex]);

    useEffect(() => {
        setTabIndex(tab);
    }, []);

    const [toastOn, setToastOn] = useState(false);
    const [toastType, setToastType] = useState(MESSAGE_TYPES.COMPLETE);
    const [toastContent, setToastContent] = useState(null);

    return (
        <Stack>
            {toastOn ? <ToastMessage type={toastType} onClick={() => setToastOn(false)}>
                {toastContent}
            </ToastMessage> : null}
            <Container>
                <SizeBox h={160}/>
                <SizeBox w={520}>
                    <RoundTab list={tabList} index={tabIndex} setIndex={setTabIndex}/>
                </SizeBox>

                <Visibility visibility={tabIndex === 0}>
                    <ShortStart toastOn={toastOn}
                                setToastOn={setToastOn}
                                setToastType={setToastType}
                                setToastContent={setToastContent}/>
                </Visibility>
                <Visibility visibility={tabIndex === 1}>
                    <ShortEnd toastOn={toastOn}
                              setToastOn={setToastOn}
                              setToastType={setToastType}
                              setToastContent={setToastContent}/>
                </Visibility>

                <SizeBox h={120}/>
            </Container>
        </Stack>
    );
}

export default ShortSelling;