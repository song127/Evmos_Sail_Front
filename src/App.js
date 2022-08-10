import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {useSelector} from "react-redux";
import ScrollToTop from "./components/utils/actions/ScrollTop";
import Header from "./components/global/header";
import DepositAndWithdraw from "./pages/home/deposit_and_withdraw";
import ShortSelling from "./pages/home/short_selling";
import CurrentAsset from "./pages/home/current_asset";
import CheckConnect from "./components/utils/actions/CheckConnect";
import ConnectWallet from "./pages/ConnectWallet";
import Loading from "./pages/Loading";

const BodyInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

function App() {
    return (
        <>
            <BodyInner>
                <ScrollToTop/>
                <CheckConnect/>
                <Header/>
                <Routes>
                    <Route path={''} element={<Loading/>}/>
                    <Route path={'/Connect'} element={<ConnectWallet/>}/>
                    <Route path={'/Transaction'} element={<DepositAndWithdraw/>}/>
                    <Route path={'/Short'} element={<ShortSelling/>}/>
                    <Route path={'/Asset'} element={<CurrentAsset/>}/>
                </Routes>
            </BodyInner>
        </>
    );
}

export default App;
