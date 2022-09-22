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
import ApproveModal from "../components/global/modals/ApproveModal";
import H6 from "../components/utils/texts/H6";
import H2 from "../components/utils/texts/H2";
import {LOG} from "../styles/utils";
import {WALLET_ERRORS} from "../network/errors/WalletErrors";
import WalletModal from "../components/global/modals/WalletModal";
import {useNavigate} from "react-router-dom";

/**
 * User Flow
 * Init User in
 * > Connect Wallet
 * > Create Wallet
 * > Approve Tokens
 * > Auto Log In
 *
 * Disconnect User
 * > Reconnect
 * */
const stepTitle = [
    'First, Connect your wallet',
    'Secondary, Create your Subwallet',
    'Finally, Approve token please.',
    'Please reconnect your wallet.'
];
const stepSubtitle = [
    'Connect your wallet in order to open positions.\n2 more steps left.',
    'Your subwallet is only available in Sail protocol.',
    'You’re almost there!',
    'Reconnect your subwallet in order to open position.\nJust click below.'
];
const stepBtn = [
    'Connect Wallet',
    'Create Sub Wallet',
    'Approve',
    'Reconnect'
];

let isDisconnected = false;

function ConnectWallet() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const actionApi = new ActionsAPI();
    const dataApi = new DataApi();

    const auth = localStorage.getItem(DATA_TYPES.AUTH);
    const blockchain = useSelector(state => state.blockchain);
    const walletLoading = useSelector(state => state.blockchain.loading);

    const [response, setResponse] = useState(false);
    const [step, setStep] = useState(-1);
    const [loading, setLoading] = useState(true);

    const [walletModal, setWalletModal] = useState(false);

    const walletConnectHandler = async (e) => {
        try {
            isDisconnected = true;
            const web3Data = await dispatch(await connect());

            if (web3Data) {
                setModal(false);
                await checkSubWallet(web3Data);
                await checkApprove();
            }
        } catch (e) {
            setLoading(false);
        }
    }

    const createWalletHandler = async (e) => {
        if (step === 1) {
            isDisconnected = true;
            setLoading(true);
            const result = await actionApi.createWalletW(blockchain);
            if (result) {
                setStep(2);
                window.location.reload();
            } else {
                dispatch(connectFailed(WALLET_ERRORS.NONE_SUB_WALLET));
            }
            setLoading(false);
        }
    }

    const reconnect = async () => {
        await dispatch(await connect());
        localStorage.setItem(DATA_TYPES.AUTH, 'true');
        navigator('/short');
    }

    const [modal, setModal] = useState(false);
    const [daiApp, setDaiApp] = useState(false);
    const [ethApp, setEthApp] = useState(false);

    const checkSubWallet = async (web3Data) => {
        const wallet = await dataApi.getSubWallet(web3Data);
        if (wallet !== 'false') {
            dispatch({type: BLOCK_ACTION_TYPES.SET_SUB_WALLET, data: wallet});
            setStep(2);
        } else {
            setStep(1);
        }
    }

    const checkApprove = async () => {
        const tokenData = await dataApi.isApprovedAavePool(blockchain);
        if (tokenData) {
            setDaiApp(true);
            setStep(3);
        } else {
            setDaiApp(false);
        }
    }

    useEffect(() => {
        if (isDisconnected && step > 2) {
            reconnect();
        }
    }, [step]);

    const checkState = async () => {
        if (!auth && blockchain.account) {
            await checkSubWallet(blockchain);
            await checkApprove();
        } else {
            setStep(0);
        }
    }

    useEffect(() => {
        if (!loading && walletLoading) {
            if (step !== 3) {
                setWalletModal(true);
            } else {
                setWalletModal(false);
            }
        }
    }, [walletLoading, step, loading]);

    let load = false;

    useEffect(async () => {
        await checkState().then(() => {
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [blockchain.account, blockchain.error]);

    useEffect(async () => {
        if (response) isDisconnected = true;
        if (response) await checkState();
    }, [response]);

    useLayoutEffect(() => {
        if (!auth) {
            dispatch({type: DATA_TYPES.MENU, data: ''});
        }
    }, []);

    return (
        <>
            {loading ?
                <Loading/> :
                <>
                    {walletModal ?
                        <WalletModal next={isDisconnected} connect={walletConnectHandler} setLoading={setLoading}
                                     setModal={setWalletModal}/>
                        : null}
                    {modal ? <ApproveModal setModal={setModal} setResponse={setResponse}
                                           daiApp={daiApp} setDaiApp={setDaiApp}
                                           ethApp={ethApp} setEthApp={setEthApp}/>
                        : null
                    }
                    <div className={'f-column a-center j-center'}>
                        <SizeBox h={300}/>
                        <Logo/>

                        <SizeBox h={16}/>
                        <H2>
                            {stepTitle[step]}
                        </H2>

                        <SizeBox h={12}/>
                        <H6>
                            {stepSubtitle[step].split('\n').map((value, index) => {
                                return <div key={index}>{value}{index < stepSubtitle.length ?
                                    <br key={index}/> : null}</div>;
                            })}
                        </H6>

                        <SizeBox h={40}/>

                        <SizeBox w={126} h={48}>
                            <SquareBtn active={true} type={0} onClick={async (e) => {
                                switch (step) {
                                    case 0:
                                        await walletConnectHandler(e);
                                        break;
                                    case 1:
                                        await createWalletHandler(e);
                                        break;
                                    case 2:
                                        setModal(true);
                                        break;
                                    case 3:
                                        await reconnect(e);
                                        break;
                                    default:
                                }
                            }}>
                                {stepBtn[step]}
                            </SquareBtn>
                        </SizeBox>
                    </div>
                </>
            }
        </>
    );
}

export default ConnectWallet;