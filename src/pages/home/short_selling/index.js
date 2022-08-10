import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useLayoutEffect, useState, useRef} from "react";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../../components/utils/actions/Animations";
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
import Loading from "../../Loading";
import DoneModal from "../../../components/global/modals/Modals/DoneModal";
import LoadingModal from "../../../components/global/modals/Modals/LoadingModal";

const Container = styled.div`
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
    DEPOSIT_REQUIRE: 4,
};

export const ModalOptions = [
    {
        name: 'Go to Short'
    },
    {
        name: 'Confirm'
    },
    {
        name: 'Confirm'
    },
    {
        name: 'Go to Asset'
    },
    {
        name: 'Go to Deposit'
    },
];

function ShortSelling() {
    const dispatch = useDispatch();
    const tab = useSelector(state => state.data.tab);
    const [tabIndex, setTabIndex] = useState(0);

    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [type, setType] = useState(0);
    const [loadingModal, setLoadingModal] = useState(false);

    const isPc = useMediaQuery({
        query: '(min-width: 1080px)'
    });

    useLayoutEffect(() => {
        dispatch({type: DATA_TYPES.MENU, data: 'short'})
    }, []);

    useEffect(() => {
        dispatch({type: DATA_TYPES.TAB, data: tabIndex});
        setLoading(true);
    }, [tabIndex]);

    useEffect(() => {
        setTabIndex(tab);
    }, []);

    return (
        <>
            {loadingModal ? <LoadingModal/> : null}
            {modal ? <DoneModal title={title} content={content} link={link} setModal={setModal} type={type}/> : null}
            <Visibility visibility={!loading}>
                <Container>
                    <SizeBox h={160}/>
                    <SizeBox w={520}>
                        <RoundTab list={tabList} index={tabIndex} setIndex={setTabIndex}/>
                    </SizeBox>

                    <Visibility visibility={tabIndex === 0 && !loading}>
                        <ShortStart setLoading={setLoading}
                                    setTitle={setTitle}
                                    setContent={setContent}
                                    setLink={setLink}
                                    setModal={setModal}
                                    setType={setType}
                                    setLoadingModal={setLoadingModal}/>
                    </Visibility>
                    <Visibility visibility={tabIndex === 1 && !loading}>
                        <ShortEnd setLoading={setLoading}
                                  setTitle={setTitle}
                                  setContent={setContent}
                                  setLink={setLink}
                                  setModal={setModal}
                                  setType={setType}
                                  setLoadingModal={setLoadingModal}/>
                    </Visibility>
                    <SizeBox h={120}/>
                </Container>
            </Visibility>
            <Visibility visibility={loading}>
                <Loading/>
            </Visibility>
        </>
    );
}

export default ShortSelling;