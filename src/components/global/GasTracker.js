import styled from "styled-components";
import {COLORS as c} from "../../styles/colors";
import H5 from "../utils/texts/H5";
import SizeBox from "../utils/blocks/SizeBox";
import ToolTip from "./ToolTip";
import H2 from "../utils/texts/H2";
import {useEffect, useState} from "react";
import Web3 from "web3";
import Spacer from "../utils/blocks/Spacer";

const UpdateBack = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 28px;

  background: #F6F7FC;
  border-radius: 8px;
  padding: 8px 16px;

  color: ${c.gray};
  font-family: Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;

function GasTracker() {
    const web3 = new Web3(window.ethereum);

    const [gasFee, setGasFee] = useState(0.0);
    const [sec, setSec] = useState(0);
    let mounted = true;
    let secV = 0

    useEffect(async () => {
        const gasFeeData = parseFloat(await web3.eth.getGasPrice());
        if (!mounted) return;
        setGasFee(gasFeeData / web3.utils.toBN(10)
            .pow(web3.utils.toBN(9)));
        setInterval(async () => {
            if (secV >= 10) {
                if(!mounted) return;
                const gasFeeData = parseFloat(await web3.eth.getGasPrice());
                setGasFee(gasFeeData / web3.utils.toBN(10)
                    .pow(web3.utils.toBN(9)));
                secV = 0;
                setSec(0);
            }
            if(!mounted) return;
            secV += 1;
            setSec(value => value + 1);
        }, 1000);
    }, []);

    return (
        <div className={'f-column'}>
            <div className={'f-row a-center'}>
                <H5>
                    Gas Tracker
                </H5>

                <SizeBox w={5}/>
                <ToolTip title={'Gas tracker :'}>
                    Network usage fee you use will be calculated differently depending on the overall network (currently
                    Ethereum) usage.
                    <br/>
                    This indicator refers to the Gas tracker in etherscan, the character of gas fee can be fluctuate.
                </ToolTip>
            </div>

            <SizeBox h={40}/>
            <div className={'f-row a-center'}>
                <H2 color={c.blue_3}>
                    😁
                    {'  ' + gasFee} GWEI
                </H2>
            </div>

            <SizeBox h={30}/>
            <UpdateBack>
                Next update in {10 - sec}s
                <Spacer/>
            </UpdateBack>
        </div>
    );
}

export default GasTracker;