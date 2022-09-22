import styled from "styled-components";
import {COLORS as c} from "../../../styles/colors";
import ModalWrapper from "./ModalWrapper";
import {useEffect} from "react";
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';
import {ReactComponent as X} from "../../../assets/icons/icon-x.svg";
import {useSelector} from "react-redux";
import {WALLET_ERRORS} from "../../../network/errors/WalletErrors";
import Spacer from "../../utils/blocks/Spacer";
import H4 from "../../utils/texts/H4";
import SizeBox from "../../utils/blocks/SizeBox";
import BasicSquareBtn from "../BasicSquareBtn";
import Sub3 from "../../utils/texts/Sub3";
import SquareBtn from "../SquareBtn";

const BackBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 400px;
  height: max-content;
  padding: 24px 30px;
  box-sizing: border-box;
  background-color: ${c.white};
  border-radius: 16px;
`;

const XBtn = styled(X)`
  cursor: pointer;
  
  width: 24px;
  height: 24px;
`;

// const stateTitle = [
//     'Connecting Error'
// ];
// const stateDesc = [
//     'Connecting wallet failed.\nPlease try again.'
// ];

function WalletModal({setModal, setLoading, connect, ...props}) {
    const block = useSelector(state1 => state1.blockchain);
    const state = useSelector(state1 => state1.blockchain.error);
    const loading = useSelector(state1 => state1.blockchain.loading);

    useEffect(() => {
        if(block.account) {
            setModal(false);
            setLoading(true);
        }
    }, [block.account, setModal, setLoading]);

    return (
        <ModalWrapper>
            <BackBoard>
                <div className={'f-row'}>
                    <Spacer/>
                    <XBtn onClick={() => setModal(false)}/>
                </div>
                {
                    loading ? <div className={'f-column a-center'}>
                        <SizeBox h={30}/>
                        <CircularProgress sx={{
                            color: c.blue_2,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                            },
                        }} thickness={6} size={44}/>

                        <SizeBox h={20}/>
                        <H4>
                            Connecting ...
                        </H4>

                        <SizeBox h={30}/>
                    </div>  : null
                }
                {state === WALLET_ERRORS.NOT_INSTALL ? <div className={'f-column a-center'}>
                    <H4>
                        MetaMask is not installed.
                    </H4>

                    <SizeBox h={16}/>
                    <Sub3>
                        There’s no wallet in your browser.<br/>
                        Please check your wallet extension states.
                    </Sub3>

                    <SizeBox h={36}/>
                    <SizeBox h={60} w={'100%'}>
                        <BasicSquareBtn active={true} onClick={async () => {await connect()}}>
                            Retry
                        </BasicSquareBtn>
                    </SizeBox>

                    <SizeBox h={10}/>
                    <SizeBox h={60} w={'100%'}>
                        <SquareBtn active={true} type={2} onClick={() => setModal(false)}>
                            Back to the Connect Wallet
                        </SquareBtn>
                    </SizeBox>
                </div> : null}
                {state === WALLET_ERRORS.DIFF_NET ? <div className={'f-column a-center'}>
                    <H4>
                        Network Error
                    </H4>

                    <SizeBox h={16}/>
                    <Sub3>
                        Please connect your wallet network to Kovan.
                    </Sub3>

                    <SizeBox h={36}/>
                    <SizeBox h={60} w={'100%'}>
                        <BasicSquareBtn active={true} onClick={async () => {await connect()}}>
                            Retry
                        </BasicSquareBtn>
                    </SizeBox>

                    <SizeBox h={10}/>
                    <SizeBox h={60} w={'100%'}>
                        <SquareBtn active={true} type={2} onClick={() => setModal(false)}>
                            Back to the Connect Wallet
                        </SquareBtn>
                    </SizeBox>
                </div> : null}
                {state === WALLET_ERRORS.REJECTED ? <div className={'f-column a-center'}>
                    <H4>
                        Connecting Error
                    </H4>

                    <SizeBox h={16}/>
                    <Sub3>
                        Connecting wallet failed.<br/>
                        Please try again.
                    </Sub3>

                    <SizeBox h={36}/>
                    <SizeBox h={60} w={'100%'}>
                        <BasicSquareBtn active={true} onClick={async () => {await connect()}}>
                            Retry
                        </BasicSquareBtn>
                    </SizeBox>

                    <SizeBox h={10}/>
                    <SizeBox h={60} w={'100%'}>
                        <SquareBtn active={true} type={2} onClick={() => setModal(false)}>
                            Back to the Connect Wallet
                        </SquareBtn>
                    </SizeBox>
                </div> : null}
            </BackBoard>
        </ModalWrapper>
    );
}

export default WalletModal;