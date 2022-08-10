import styled from 'styled-components';
import {COLORS as c} from "../../../../styles/colors";
import ModalWrapper from "./ModalWrapper";
import {ContentLoaded} from "../../../utils/actions/Animations";
import SizeBox from "../../../utils/blocks/SizeBox";
import {CompleteTypes, ModalOptions} from "../../../../pages/home/short_selling";
import {Link} from "react-router-dom";
import {DATA_TYPES} from "../../../../redux/data/dataReducer";
import {useDispatch} from "react-redux";

const BackBoard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;

  width: 100%;
  max-width: 600px;
  height: max-content;

  background: ${c.white};
  box-shadow: 0px 4px 24px rgba(47, 47, 54, 0.12);
  border-radius: 16px;
  padding: 30px 24px;
  box-sizing: border-box;

  animation: ${ContentLoaded} 0.4s;
  animation-fill-mode: forwards;
`;

const Title = styled.div`
  align-self: start;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

const Desc = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;

  color: ${c.font_color};
`;

const Btn = styled.button`
  cursor: pointer;

  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.yes ? c.blue_2 : c.white};
  border-radius: 8px;
  border: ${props => props.yes ? null : `2px solid ${c.light_gray}`};

  color: ${props => props.yes ? c.white : c.font_color};
  font-size: 12px;
`;

function DoneModal({title, content, setModal, type, link, ...props}) {
    const dispatch = useDispatch();
    return (
        <ModalWrapper>
            <BackBoard>
                <Title>
                    {title}
                </Title>

                <SizeBox h={12}/>
                <Desc>
                    {content}
                </Desc>

                <SizeBox h={40}/>
                {link != undefined ? <div className={'f-row j-space'}>
                    <Btn yes={false} onClick={() => setModal(false)}>
                        Not Now
                    </Btn>

                    <SizeBox w={8}/>
                    <SizeBox w={'100%'}>
                        <Link to={link} style={{width: 'inherit'}}>
                            <Btn yes={true} onClick={() => {
                                type === CompleteTypes.DEPOSIT ?
                                    dispatch({type: DATA_TYPES.TAB, data: 0}):
                                    dispatch({type: DATA_TYPES.TAB, data: 1})
                            }}>
                                {ModalOptions[type].name}
                            </Btn>
                        </Link>
                    </SizeBox>
                </div> : <Btn yes={true} onClick={() => setModal(false)}>
                    Confirm
                </Btn>}
            </BackBoard>
        </ModalWrapper>
    );
}

export default DoneModal;