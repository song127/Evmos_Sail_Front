import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {ReactComponent as Logo} from "../../../assets/images/img-header-logo.svg";
import Spacer from "../../utils/blocks/Spacer";
import SizeBox from "../../utils/blocks/SizeBox";
import {Link, useNavigate} from "react-router-dom";
import SquareBtn from "../SquareBtn";
import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../utils/actions/Animations";
import {BLOCK_ACTION_TYPES} from "../../../redux/blockchain/blockchainReducer";
import {connect} from "../../../redux/blockchain/blockchainActions";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;
  background-color: ${c.white};
  box-shadow: 0px 4px 24px rgba(68, 61, 246, 0.08);

  animation: ${ContentLoaded} 1.0s;
  animation-fill-mode: forwards;

  z-index: 1200;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  width: 100%;
  height: 100%;
  height: 90px;
  max-width: 1080px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 100%;
  background-color: transparent;

  color: ${c.blue_2};
  font-size: ${props => props.isSelected ? '16px' : '15px'};
  font-weight: ${props => props.isSelected ? '600' : '400'};

  opacity: ${props => props.isSelected ? 1 : 0.3};

  transition: all 0.3s;

  &:hover {
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
  }
`;

const BlockWrapper = styled.div`
  pointer-events: ${props => props.valid ? 'all' : 'none'};
`;

function Header() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const navigator = useNavigate();
    const auth = localStorage.getItem(DATA_TYPES.AUTH);

    const menuList = [
        {url: '/short', name: 'Short Selling', id: 'short'},
        {url: '/transaction', name: 'Deposit/Withdraw', id: 'transaction'},
        {url: '/asset', name: 'Current Asset', id: 'asset'},
    ]

    const handleLogin = async () => {
        if (auth) {
            await logout();
            window.location.reload();
        } else {
            await login();
        }
    }

    const login = async () => {
        await dispatch(await connect());
        localStorage.setItem(DATA_TYPES.AUTH, 'true');
        navigator('/short');
    }

    const logout = async () => {
        dispatch({type: BLOCK_ACTION_TYPES.BLOCK_RESET});
        dispatch({type: DATA_TYPES.DATA_RESET});
        localStorage.removeItem(DATA_TYPES.AUTH);
    }

    return (
        <Container>
            <Inner>
                <Logo onClick={() => auth ? navigator('/short') : null} style={{cursor: 'pointer'}}/>

                <SizeBox w={27}/>
                {
                    menuList.map((menuInfo, index) => {
                        return <SizeBox key={index} h={60}>
                            <BlockWrapper valid={auth}>
                                <Link to={menuInfo.url}>
                                    <MenuItem isSelected={data.menu === menuInfo.id}>
                                        {menuInfo.name}
                                    </MenuItem>
                                </Link>
                            </BlockWrapper>
                        </SizeBox>
                    })
                }

                <Spacer/>

                <SizeBox w={144} h={36}>
                    <SquareBtn type={1} active={true} onClick={() => handleLogin()}>
                        {auth ? 'Disconnect' : 'Connect Wallet'}
                    </SquareBtn>
                </SizeBox>
            </Inner>
        </Container>
    );
}

export default Header;