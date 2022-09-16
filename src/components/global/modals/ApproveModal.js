import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import ModalWrapper from "./ModalWrapper";
import Spacer from "../../utils/blocks/Spacer";
import {ReactComponent as X} from "../../../assets/icons/icon-x.svg";
import {ReactComponent as DAI} from "../../../assets/icons/tokens/icon-dai.svg";
import {ReactComponent as ETH} from "../../../assets/icons/tokens/icon-eth.svg";
import {ReactComponent as CheckI} from "../../../assets/icons/icon-full_check_box.svg";
import {ReactComponent as UnCheckI} from "../../../assets/icons/icon-empty_check_box.svg";
import SizeBox from "../../utils/blocks/SizeBox";
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from "react";
import {ContentLoaded} from "../../utils/actions/Animations";
import DataApi from "../../../network/DataApi";
import {useSelector} from "react-redux";
import ActionsAPI from "../../../network/ActionsAPI";
import {TokenAddress} from "../../../datas/Address";
import BasicSquareBtn from "../BasicSquareBtn";
import H4 from "../../utils/texts/H4";
import H5 from "../../utils/texts/H5";
import Sub1 from "../../utils/texts/Sub1";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.loading ? 'center' : 'start'};
  justify-content: ${props => props.loading ? 'center' : 'start'};

  width: 400px;
  height: ${props => props.loading ? '300px' : 'max-content'};

  padding: 30px 24px;
  box-sizing: border-box;
  background-color: ${c.white};
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(47, 47, 54, 0.12);

  animation: ${ContentLoaded} 0.8s;
`;

const XIcon = styled(X)`
  cursor: pointer;
`;

const Check = styled(CheckI)`
  cursor: pointer;
`;

const UnCheck = styled(UnCheckI)`
  cursor: pointer;
`;

const Item = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: max-content;

  background: #FFFFFF;
  border: 1px solid ${p => p.selected ? c.blue_2 : c.gray_3};
  border-radius: 12px;

  padding: 14px 8px;
`;

function ApproveModal({setModal, setResponse, daiApp = false, setDaiApp, ethApp = false, setEthApp, ...props}) {
    const blockchain = useSelector(state => state.blockchain);
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const [loading, setLoading] = useState(true);
    const [isAll, setIsAll] = useState(false);

    const [collateral, setCollateral] = useState(false);
    const [short, setShort] = useState(false);

    const allHandler = () => {
        if (!isAll) {
            setCollateral(true);
            setShort(true);
        } else {
            setCollateral(false);
            setShort(false);
        }
        setIsAll(value => !value);
    }

    useEffect(() => {
        if (!collateral) {
            setIsAll(false);
            return
        }

        if (!short) {
            setIsAll(false);
            return
        }

        setIsAll(true);
    }, [collateral, short]);

    useEffect(async () => {
        if (blockchain.account) {
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
        if (result) {
            setResponse(true);
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
                                <H4>
                                    Token List
                                </H4>

                                <Spacer/>
                                <XIcon onClick={() => setModal(false)}/>
                            </div>

                            <SizeBox h={40}/>
                            <div className={'f-row a-center'} style={{cursor: 'pointer'}}
                                 onClick={allHandler}>
                                {
                                    isAll ? <Check/> : <UnCheck/>
                                }

                                <SizeBox w={4}/>
                                <H5 color={c.gray}>
                                    Select All
                                </H5>
                            </div>

                            <SizeBox h={20}/>
                            <Sub1 align={'start'} color={c.gray}>
                                Collateral Token
                            </Sub1>

                            <SizeBox h={10}/>
                            <Item onClick={() => setCollateral(value => !value)} selected={collateral}>
                                <DAI width={24} height={24}/>
                                <SizeBox w={8}/>
                                DAI

                                <Spacer/>

                                { collateral ? <Check/> : <UnCheck/> }
                            </Item>

                            <SizeBox h={20}/>
                            <Sub1 align={'start'} color={c.gray}>
                                Short Token
                            </Sub1>

                            <SizeBox h={10}/>
                            <Item onClick={() => setShort(value => !value)} selected={short}>
                                <ETH width={24} height={24}/>
                                <SizeBox w={5}/>
                                ETH

                                <Spacer/>
                                { short ? <Check/> : <UnCheck/> }
                            </Item>

                            <SizeBox h={30}/>
                            <div className={'f-row j-end'}>
                                <SizeBox w={84} h={40}>
                                    <BasicSquareBtn type={1} active={!daiApp && isAll} onClick={() => {
                                        if(isAll) {
                                            approveToken();
                                        }
                                    }}>
                                        {
                                            daiApp ? 'Approved' : 'Approve'
                                        }
                                    </BasicSquareBtn>
                                </SizeBox>
                            </div>
                        </>
                }
            </Content>
        </ModalWrapper>
    );
}

export default ApproveModal;