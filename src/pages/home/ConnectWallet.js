import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";
import {ReactComponent as Logo} from "../../assets/icons/icon-logo.svg";
import SizeBox from "../../components/utils/blocks/SizeBox";
import SquareBtn from "../../components/global/SquareBtn";
import {useDispatch, useSelector} from "react-redux";
import {connect, connectFailed} from "../../redux/blockchain/blockchainActions";
import {DATA_TYPES} from "../../redux/data/dataReducer";

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

    const walletConnectHandler = async (e) => {
        await dispatch(await connect());
    }

    const createWalletHandler = async (e) => {
        let result = false;
        if(result) {
            localStorage.setItem(DATA_TYPES.AUTH, 'true');
        } else {
            dispatch(connectFailed("Create wallet please."));
        }
    }

    return (
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
            {blockchain.account ? <>
                <SizeBox w={126} h={48}>
                    <SquareBtn active={true} type={0} onClick={walletConnectHandler}>
                        Connect Wallet
                    </SquareBtn>
                </SizeBox>
            </> : null}

            <SizeBox h={12}/>
            <SizeBox w={126} h={48}>
                <SquareBtn active={true} type={0} onClick={createWalletHandler}>
                    Create Wallet
                </SquareBtn>
            </SizeBox>
        </div>
    );
}

export default ConnectWallet;