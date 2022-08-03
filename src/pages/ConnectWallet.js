import styled from "styled-components";
import {COLORS as c} from "../styles/colors";
import {ReactComponent as Logo} from "../assets/icons/icon-logo.svg";
import SizeBox from "../components/utils/blocks/SizeBox";
import SquareBtn from "../components/global/SquareBtn";
import {useDispatch, useSelector} from "react-redux";
import {connect, connectFailed} from "../redux/blockchain/blockchainActions";
import {DATA_TYPES} from "../redux/data/dataReducer";
import DataApi from "../network/DataApi";
import {useEffect, useState} from "react";
import Loading from "./Loading";
import ActionsAPI from "../network/ActionsAPI";
import {BLOCK_ACTION_TYPES} from "../redux/blockchain/blockchainReducer";

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
    const [test, setTest] = useState('');
    const [isSubWalletExist, setIsSubWalletExist] = useState(false);

    const checkSubWallet = async (web3Data) => {
        const wallet = await dataApi.getSubWallet(web3Data);
        dispatch({type: BLOCK_ACTION_TYPES.SET_SUB_WALLET, data: wallet});
        setIsSubWalletExist(wallet != 'false');
    }

    const walletConnectHandler = async (e) => {
        const web3Data = await dispatch(await connect());
        if(web3Data) {
            await checkSubWallet(web3Data);
        }
    }

    const reconnect = async (e) => {
        localStorage.setItem(DATA_TYPES.AUTH, 'true');
        await dispatch(await connect());
    }

    const createWalletHandler = async (e) => {
        if(!isSubWalletExist) {
            const result = await actionApi.createWallet(blockchain);
            if (result) {
                localStorage.setItem(DATA_TYPES.AUTH, 'true');
                await dispatch(await connect());
            } else {
                dispatch(connectFailed("Create wallet please."));
            }
        }
    }

    useEffect(async () => {
        const web3Data = await dispatch(await connect());

        if(web3Data) {
            await checkSubWallet(web3Data);
        }
        setLoading(false);
    }, [window.location]);

    return (
        <>
            {loading ?
                <Loading/> :
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

                    {blockchain.errorMsg != '' ? <SizeBox h={30}/> : null}
                    {blockchain.errorMsg != '' ? blockchain.errorMsg : null}

                    <SizeBox h={40}/>

                    {blockchain.account == null ?
                        <SizeBox w={126} h={48}>
                            <SquareBtn active={true} type={0} onClick={walletConnectHandler}>
                                Connect Wallet
                            </SquareBtn>
                        </SizeBox> :
                        isSubWalletExist ?
                            <SizeBox w={126} h={48}>
                                <SquareBtn active={true} type={0} onClick={reconnect}>
                                    Reconnect
                                </SquareBtn>
                            </SizeBox> : null
                    }

                    {!isSubWalletExist && blockchain.account != null ?
                        <SizeBox w={126} h={48}>
                            <SquareBtn active={true} type={0} onClick={createWalletHandler}>
                                Create SubWallet
                            </SquareBtn>
                        </SizeBox> : null
                    }
                </div>
            }
        </>
    );
}

export default ConnectWallet;