import "./App.css";
import React, {useEffect, useState, useRef} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {connect} from "./redux/blockchain/blockchainActions";
import ScrollToTop from "./components/utils/actions/ScrollTop";
import Header from "./components/global/header";
import DepositAndWithdraw from "./pages/home/deposit_and_withdraw";
import ShortSelling from "./pages/home/short_selling";
import CurrentAsset from "./pages/home/current_asset";
import CheckConnect from "./components/utils/actions/CheckConnect";
import ConnectWallet from "./pages/home/ConnectWallet";

const BodyInner = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

function App() {
    const headerOn = useSelector((state) => state.data.header);

    return (
        <>
            <BodyInner>
                <ScrollToTop/>
                <CheckConnect/>
                {headerOn ? <Header/> : null}
                <Routes>
                    <Route path={'/Connect'} element={<ConnectWallet/>}/>
                    <Route path={'/Transaction'} element={<DepositAndWithdraw/>}/>
                    <Route path={'/Short'} element={<ShortSelling/>}/>
                    <Route path={'/Asset'} element={<CurrentAsset/>}/>
                </Routes>
            </BodyInner>
        </>
    );
}

// <s.Screen>
//   {blockchain.account === "" || blockchain.smartContract === null ? (
//       <s.Container flex={1} ai={"center"} jc={"center"}>
//         <s.TextTitle>Connect to the Blockchain</s.TextTitle>
//         <s.SpacerSmall />
//         <StyledButton
//             onClick={(e) => {
//               e.preventDefault();
//               dispatch(connect());
//             }}
//         >
//           CONNECT
//         </StyledButton>
//         <s.SpacerSmall />
//         {blockchain.errorMsg !== "" ? (
//             <s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
//         ) : null}
//       </s.Container>
//   ) : (
//       <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
//         <s.TextTitle style={{ textAlign: "center" }}>
//           Name: {data.name}.
//         </s.TextTitle>
//       </s.Container>
//   )}
// </s.Screen>

export default App;
