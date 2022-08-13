import * as React from "react";
import { Row, Col } from 'react-grid-system';
import '../css/SwapComponent.css';
import swapBtnImage from '../images/swapBtn.png';
import klearImage from '../images/logo.png';
import bnbImage from '../images/bnb-logo.png';
import busdImage from '../images/busd-logo.png';
import neonImage0 from '../images/neon/1.png';
import neonImage1 from '../images/neon/12.png';
import neonImage2 from '../images/neon/32.png';
import neonImage3 from '../images/neon/6.png';
import neonImage4 from '../images/neon/38.png';
import neonImage5 from '../images/neon/22.png';
import neonImage6 from '../images/neon/27.png';
import neonImage7 from '../images/neon/66.png';
import neonImage8 from '../images/neon/65.png';
import neonImage9 from '../images/neon/64.png';
import arrowDown from '../images/arrow-down.png';
import TradeContext from '../context/TradeContext';
import { addressSet } from '../constant/addressSet';
import {
    pancakeRouterABI, routerAddress,
    pancakePairABI, tokenABI
} from '../constant/contractABI';

import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
var token_list = [
    ['BNB', 'BUSD'],
    ['KLEAR']
];
var dialogOrder = 0;
var fromToLabel = ['From', 'To'];
function SwapComponent(props) {
    const [approved, setApproved]=React.useState(true);
    const handleSubmit = async () => {
        if (!approved) {
            let contractTokenInstance = getContractInstance(tokenABI, addressSet[token_names[0]]);
            
        } else {
            
        }
    }
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(token_list[0][0]);
    const [balanceValue, setBalanceValue] = React.useState([0, 0]);
    const [token_names, setToken_names] = React.useState(["BNB", "KLEAR"]);
    const [amountValue, setAmountValue] = React.useState(["", ""]);
    const [approved, setApproved] = React.useState(true);
    const [rate, setRate] = React.useState(0);
    const { walletAddress, web3Instance, openTransak } = React.useContext(TradeContext);
    const amountMax = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
    const approveFunction = async (contractTokenInstance) => {
        try {
            await contractTokenInstance.methods.approve(
                routerAddress,
                amountMax
            ).send({ from: walletAddress});
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async () => {
       if (!approved) {
           let contractTokenInstance = getContractInstance(tokenABI, addressSet[token_name[0]]);
           await approveFunction(contractTokenInstance);
           
       } else {
           if (amountValue[0] > balanceValue[0]) {
               return;
           } 
           let token_address = addressSet[token_names[0]];
           let token_address = addressSet[token_names[1]];
           let contractPancakeRouter = getContractInstance(pancakeRouterABI, routerAddress);
           let deadline = 200000000;
       }
       if (token_names[0] == 'BNB' && token_name[1] == "KLEAR") {
           let path = [ token0_address, token1_address];
           let value = amountValue[0] * Math.pow(10,18);
           let amountOutMin = 0;
           try {
               await contractPancakeRouter.methods.swapExactETHForTokens(
                   amountOutMin.toString(),
                   path,
                   walletAddress,
                   deadline
               ).send({from:walletAddress, value: value.toString()});
           } catch (error) {
               console.log(error)
           }
           
       } else if (token_name[0] == "KLEAR" && token_name[1] == 'BNB') {

                 let amountIn = amountValue[0] * Math.pow(10, 9);
                 let path = [token0_address, token1_address];
                 let amountOutMin = 0;
                 console.log(amountIn);
                 console.log(amountOutMin);
                 console.log(path);
                 console.log(walletAddress);
                 console.log(deadline);
       }
    }
    return (
        <div className="swap-container">
            <div>
 
                <img className="neon-image neon-image0" src={neonImage0} alt="neonImage0" />
                <img className="neon-image neon-image1" src={neonImage1} alt="neonImage1" />
                <img className="neon-image neon-image2" src={neonImage2} alt="neonImage2" />
                <img className="neon-image neon-image3" src={neonImage3} alt="neonImage3" />
                <img className="neon-image neon-image4" src={neonImage4} alt="neonImage4" />
                <img className="neon-image neon-image5" src={neonImage5} alt="neonImage5" />
                <img className="neon-image neon-image6" src={neonImage6} alt="neonImage6" />
                <img className="neon-image neon-image7" src={neonImage7} alt="neonImage7" />
                <img className="neon-image neon-image8" src={neonImage8} alt="neonImage8" />
                <img className="neon-image neon-image9" src={neonImage9} alt="neonImage9" />
                
            <div className="swap-header">
                Swap
            </div>
            <hr></hr>
                <div className="swap-body">
                   {SwapTokenComponent(0)}
                    <div className="swap-button"></div>
                </div>
                <div className="swap-footer">
                {approved && (
                    <button className="swap-submit-btn" onClick={handleSubmit}>
                        Exchange
                    </button>
                )}
                {!approved && (
                    <button className="swap-submit-btn" onClick={handleSubmit}>
                        Approve
                    </button>
                )}
                </div>
            </div>
        </div>
    );
}
export default SwapComponent;