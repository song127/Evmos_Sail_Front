import styled from "styled-components";
import {COLORS as c} from "../styles/colors";
import {ReactComponent as Logo} from "../assets/icons/icon-logo.svg";
import SizeBox from "../components/utils/blocks/SizeBox";
import SquareBtn from "../components/global/SquareBtn";
import {useDispatch, useSelector} from "react-redux";
import {connect, connectFailed} from "../redux/blockchain/blockchainActions";
import {DATA_TYPES} from "../redux/data/dataReducer";
import DataApi from "../network/DataApi";
import {useEffect, useState, useLayoutEffect} from "react";
import Loading from "./Loading";
import ActionsAPI from "../network/ActionsAPI";
import {BLOCK_ACTION_TYPES} from "../redux/blockchain/blockchainReducer";
import ApproveModal from "../components/global/modals/Modals/ApproveModal";

const Title = styled.p`
  text-align: center;
  font-weight: 500;
  font-family: Montserrat;
  font-size: 24px;
  color: ${c.black};
  line-height: 29px;
`;

const SubTitle = styled.p`
  line-height: 20px;
`;

function ConnectWallet() {
    const blockchain = useSelector(state => state.blockchain);
    const dispatch = useDispatch();
    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const [loading, setLoading] = useState(true);
    const [isSubWalletExist, setIsSubWalletExist] = useState(false);

    const walletConnectHandler = async (e) => {
        try {
            const web3Data = await dispatch(await connect());

            if (web3Data) {
                await checkSubWallet(web3Data);
                await checkApprove();
            }
            if (isSubWalletExist) {
                localStorage.setItem(DATA_TYPES.AUTH, 'true');
                await dispatch(await connect());
            }
        } catch (e) {
            setLoading(false);
        }
    }

    const createWalletHandler = async (e) => {
        if (!isSubWalletExist) {
            setLoading(true);
            const result = await actionApi.createWalletW(blockchain);
            if (result) {
                setIsSubWalletExist(true);
                window.location.reload();
            } else {
                dispatch(connectFailed("Create wallet please."));
            }
            setLoading(false);
        }
    }

    const checkSubWallet = async (web3Data) => {
        const wallet = await dataApi.getSubWallet(web3Data);
        dispatch({type: BLOCK_ACTION_TYPES.SET_SUB_WALLET, data: wallet});
        setIsSubWalletExist(wallet != 'false');
    }

    const [modal, setModal] = useState(false);
    const [daiApp, setDaiApp] = useState(false);
    const [ethApp, setEthApp] = useState(false);

    const checkApprove = async () => {
        const tokenData = await dataApi.isApprovedAavePool(blockchain);
        if(tokenData) {
            setDaiApp(true);
        } else {
            setDaiApp(false);
        }
    }

    const reconnect = async (e) => {
        localStorage.setItem(DATA_TYPES.AUTH, 'true');
        await dispatch(await connect());
    }

    useEffect(async () => {
        if (blockchain.account) {
            await checkSubWallet(blockchain);
            await checkApprove();
            setLoading(false);
        }
        if (blockchain.errorMsg === 'Connect Rejected') {
            setLoading(false);
        }
    }, [blockchain.account, blockchain.errorMsg]);

    useEffect(async () => {
        if(blockchain.account) {
            if(isSubWalletExist) {
                if(daiApp) {
                    if(!modal) {
                        await dispatch(await connect());
                        localStorage.setItem(DATA_TYPES.AUTH, 'true');
                    }
                }
            }
        }
    }, [setModal]);

    useLayoutEffect(() => {
        dispatch({type: DATA_TYPES.MENU, data: ''})
    }, []);

    return (
        <>
            {loading ?
                <Loading/> :
                <>
                    {modal ? <ApproveModal setModal={setModal}
                                           daiApp={daiApp} setDaiApp={setDaiApp}
                                           ethApp={ethApp} setEthApp={setEthApp}/> :
                        null
                    }
                    <div className={'f-column a-center j-center'}>
                        <SizeBox h={300}/>
                        <Logo/>

                        <SizeBox h={16}/>
                        <Title>
                            Please, Connect your wallet
                        </Title>

                        <SizeBox h={12}/>
                        <SubTitle>
                            Please connect your wallet to open positions.
                        </SubTitle>

                        {/*{blockchain.errorMsg != '' ? <SizeBox h={30}/> : null}*/}
                        {/*{blockchain.errorMsg != '' ? blockchain.errorMsg : null}*/}

                        <SizeBox h={40}/>

                        <SizeBox w={126} h={48}>
                            <SquareBtn active={true} type={0} onClick={(e) => {
                                if (blockchain.account == null) {
                                    walletConnectHandler(e);
                                } else {
                                    if (isSubWalletExist) {
                                        if(daiApp) {
                                            reconnect(e);
                                        } else {
                                            setModal(true);
                                        }
                                    }
                                }
                                if (!isSubWalletExist && blockchain.account != null) {
                                    createWalletHandler(e);
                                }
                            }}>
                                {
                                    blockchain.account == null ?
                                        'Connect' : (isSubWalletExist && daiApp ? 'Reconnect' : null)
                                }
                                {
                                    !isSubWalletExist && blockchain.account != null ? 'Create SubWallet' : null
                                }
                                {
                                    isSubWalletExist && !daiApp && blockchain.account !== null ? 'Approve' : null
                                }
                            </SquareBtn>
                        </SizeBox>
                    </div>
                </>
            }
        </>
    );
}

export default ConnectWallet;