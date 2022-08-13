import * as React from "react";
import '../css/Header.css';
import { Container, Row, Col } from 'react-grid-system';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import TradeContext from '../context/TradeContext';
import metamaskImage from '../images/metamask.svg';
import walletConnectImage from '../images/walletConnect.png';
import { useWallet } from 'use-wallet';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

const connectWalletTypes = ['Metamask', 'WalletConnect'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
        console.log(value);
        if (value == "Metamask") props.connectMetamask();
        

    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Connect to a wallet</DialogTitle>
            <List>
                {connectWalletTypes.map((type) => (
                <ListItem button onClick={() => handleListItemClick(type)} key={type}>
                    <ListItemAvatar>
                        {type == "Metamask" && (
                            <img className="swap-connect-wallet-image" src={metamaskImage} alt="metamaskImage" />
                        )}
                        {type == "WalletConnect" && (
                            <img className="swap-connect-wallet-image" src={walletConnectImage} alt="walletConnectImage" />
                        )}
                    </ListItemAvatar>
                    <ListItemText primary={type} />
                </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function Header() {
    const wallet = useWallet();
    const { walletAddress, setWalletAddress, setWeb3Instance, openTransak } = React.useContext(TradeContext);
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(connectWalletTypes[0]);
    
    
    const handleClickOpen = () => {
        if (walletAddress === "") {
            setOpen(true);
        } else {
            setWalletAddress("");
            setWeb3Instance(null);
        }
    }

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };
    
    const connectMetamask = async () => {
        const currentProvider = await detectEthereumProvider();
        if (currentProvider) {
            let web3InstanceCopy = new Web3(currentProvider);
            setWeb3Instance(web3InstanceCopy);
            
            if (!window.ethereum.selectedAddress) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            }
            await window.ethereum.enable();
            let currentAddress = window.ethereum.selectedAddress;
            setWalletAddress(currentAddress);
            console.log("currentAddress", currentAddress);
        } else {
            console.log('Please install MetaMask!');
        }
    }

    const walletConnect = async () => {
        const currentProvider = await detectEthereumProvider();
        if (currentProvider) {
            let web3InstanceCopy = new Web3(currentProvider);
            setWeb3Instance(web3InstanceCopy);
            console.log(web3InstanceCopy);
            try {
                wallet.connect('walletconnect');
            } catch {
                console.log("walletConnect error!");
            }
        }
    }
  
    const getAbbrWalletAddress = (walletAddress) => {
        let abbrWalletAddress = walletAddress.substring(0, 4) + "..." + walletAddress.substring(38, 42);
        return abbrWalletAddress.toUpperCase();
    }

   React.useEffect(() => {
        console.log('state', wallet.status);
        if (wallet.status == "connected") {
            let currentAddress = wallet.account;
            console.log(currentAddress);
            setWalletAddress(currentAddress);
        }
    }) 

    return (
        <div className="header">
            <div>
                <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                    connectMetamask={connectMetamask}
                    walletConnect={walletConnect}
                />
            </div>
            <Container>
                <Row>
                    <Col xs={12} sm={4} className="header-section">
                        <a className="header-link" href="https://www.klear.finance" style={{ marginRight: "10px" }}>
                            <img src={logo} alt="Logo" width="92px" height="92px" />
                        </a>
                        KLEAR.EXCHANGE
                    </Col>
                    <Col sm={3} className="header-section header-section-none">
                    </Col>
                    <Col xs={12} sm={5} className="header-section">
                        <Link className="header-link" to="/" onClick={() => openTransak()}>Buy BNB</Link>
                        
                        {walletAddress == "" && (
                            <button className="header-connect-btn" onClick={() => handleClickOpen()}>
                                Connect Wallet
                            </button>
                        )}
                        {walletAddress != "" && (
                            <button className="header-connect-btn" onClick={() => handleClickOpen()}>
                                {getAbbrWalletAddress(walletAddress)}
                            </button>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Header;