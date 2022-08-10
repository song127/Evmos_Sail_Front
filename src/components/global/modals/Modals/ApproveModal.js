import styled from "styled-components";
import {COLORS as c} from "../../../../styles/colors";
import ModalWrapper from "./ModalWrapper";
import Spacer from "../../../utils/blocks/Spacer";
import {ReactComponent as X} from "../../../../assets/icons/icon-x.svg";
import {ReactComponent as DAI} from "../../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as ETH} from "../../../../assets/icons/tokens/icon-eth.svg";
import SizeBox from "../../../utils/blocks/SizeBox";
import SquareBtn from "../../SquareBtn";
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";
import {ContentLoaded} from "../../../utils/actions/Animations";
import DataApi from "../../../../network/DataApi";
import {useSelector} from "react-redux";
import ActionsAPI from "../../../../network/ActionsAPI";
import {TokenAddress} from "../../../../datas/Address";
import BasicSquareBtn from "../../BasicSquareBtn";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.loading ? 'center' : 'start'};

  width: 520px;
  height: ${props => props.loading ? '100%' : 'max-content'};
  max-height: 260px;

  padding: 30px 24px;
  box-sizing: border-box;
  background-color: ${c.white};
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(47, 47, 54, 0.12);
  
  animation: ${ContentLoaded} 0.8s;
`;

const Title = styled.div`
  font-weight: 700;
  color: ${c.font_color};
`;

const XIcon = styled(X)`
  cursor: pointer;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: max-content;

  padding: 8px;
`;

function ApproveModal({setModal, daiApp = false, setDaiApp, ethApp = false, setEthApp, ...props}) {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        if(blockchain.account) {
            const tokenData = await dataApi.isApprovedAavePool(blockchain);
            setDaiApp(tokenData);
            const ethData = await dataApi.isApprovedBorrowEth(blockchain);
            setEthApp(ethData);

            setLoading(false);
        }
    }, [blockchain]);

    const [err, setErr] = useState(0);

    const approveToken = async () => {
        setLoading(true);
        const result = await actionApi.multiApprove(blockchain, [TokenAddress.DAI]);
        if(result) {
            setModal(false);
            setErr(1);
        } else {
            setErr(2);
        }
        setLoading(false);
    }

    return (
        <ModalWrapper>
            <Content loading={loading}>
                {
                    loading ? <CircularProgress/> :
                        <>
                            <div className={'f-row a-center'}>
                                <Title>
                                    Manage Token List
                                </Title>

                                <Spacer/>
                                <XIcon onClick={() => setModal(false)}/>
                            </div>

                            <SizeBox h={40}/>
                            <Item>
                                <DAI/>
                                <SizeBox w={8}/>
                                DAI,
                                <ETH/>
                                <SizeBox w={5}/>
                                ETH

                                <Spacer/>

                                <SizeBox w={120} h={40}>
                                    <BasicSquareBtn type={1} active={!daiApp} onClick={() => approveToken()}>
                                        {
                                            daiApp ? 'Approved' : 'Multi Approve'
                                        }
                                    </BasicSquareBtn>
                                </SizeBox>
                            </Item>

                            {/*<SizeBox h={12}/>*/}
                            {/*<Item>*/}
                            {/*    <ETH/>*/}
                            {/*    <SizeBox w={10}/>*/}
                            {/*    ETH*/}

                            {/*    <Spacer/>*/}

                            {/*    <SizeBox w={96} h={40}>*/}
                            {/*        <BasicSquareBtn type={1} active={!ethApp} onClick={() => {*/}
                            {/*        }}>*/}
                            {/*            {*/}
                            {/*                ethApp ? 'Approved' : 'Approve'*/}
                            {/*            }*/}
                            {/*        </BasicSquareBtn>*/}
                            {/*    </SizeBox>*/}
                            {/*</Item>*/}
                        </>
                }
            </Content>
        </ModalWrapper>
    );
}

export default ApproveModal;