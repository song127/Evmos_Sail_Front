import styled from 'styled-components';
import {COLORS as c} from "../../../styles/colors";
import {ReactComponent as Logo} from "../../../assets/images/img-header-logo.svg";
import Spacer from "../../utils/blocks/Spacer";
import SizeBox from "../../utils/blocks/SizeBox";
import {Link, useNavigate} from "react-router-dom";
import SquareBtn from "../SquareBtn";
import {useDispatch, useSelector} from "react-redux";
import {DATA_TYPES} from "../../../redux/data/dataReducer";
import {ContentLoaded} from "../../utils/actions/ContentLoaded";
import {BLOCK_ACTION_TYPES} from "../../../redux/blockchain/blockchainReducer";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${c.header_back};
  position: fixed;
  z-index: 1200;
  
  animation: ${ContentLoaded} 1.0s;
  animation-fill-mode: forwards;
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1080px;
  height: 90px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  font-size: ${props => props.isSelected ? '17px' : '16px'};
  
  opacity: ${props => props.isSelected ? 1 : 0.3};

  transition: all 0.3s;

  &:hover {
    opacity: 1;
    font-size: 17px;
  }
`;

function Header() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const blockchain = useSelector(state => state.blockchain);
    const navigator = useNavigate();

    const menuList = [
        {url: '/short', name: 'Short Selling', id: 'short'},
        {url: '/transaction', name: 'Deposit/Withdraw', id: 'transaction'},
        {url: '/asset', name: 'Current Asset', id: 'asset'},
    ]

    // const isPc = useMediaQuery({
    //     query: '(min-width: 920px)'
    // });

    const handleLogin = async () => {
        dispatch({type: BLOCK_ACTION_TYPES.BLOCK_RESET});
        dispatch({type: DATA_TYPES.DATA_RESET});
        localStorage.removeItem(DATA_TYPES.AUTH);
    }

    return (
        <Container>
            <Inner>
                <Logo onClick={() => navigator('/Short')} style={{cursor: 'pointer'}}/>

                <SizeBox w={27}/>
                {
                    menuList.map((menuInfo, index) => {
                        return <SizeBox key={index} h={60}>
                            <Link to={menuInfo.url}>
                                <MenuItem isSelected={data.menu === menuInfo.id}>
                                    {menuInfo.name}
                                </MenuItem>
                            </Link>
                        </SizeBox>
                    })
                }

                <Spacer/>

                <SizeBox w={144} h={36}>
                    <SquareBtn type={1} active={true} onClick={() => handleLogin()}>
                        {blockchain.account ? 'Disconnect' : 'Connect'}
                    </SquareBtn>
                </SizeBox>
            </Inner>
        </Container>
    );
}

export default Header;