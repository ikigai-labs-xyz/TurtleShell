import React from 'react';
import logo from '../assets/turtle.svg';
import open_dapp from '../assets/open-dApp-button.svg';
import './Navbar.css';

import { mainnet, optimism } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAccount, useConnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {

    const { connector: activeConnector, isConnected } = useAccount()
    const { connect } = useConnect()

    const handleConnectAndRedirect = async (event) => {
        event.preventDefault();
        try {
            await connect({ connector: new MetaMaskConnector({ chains: [mainnet, optimism] }) });
            window.location.href = "/new-audit/choose";
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='Navbar'>
            <div className='navbar-row'>
                <div >
                    <img className='navbar-logo' src={logo} alt='Logo'/>
                </div>
                <div className='navbar-text'>
                    TrutleShell
                </div>
            </div>
            <div>
                {isConnected && <ConnectButton/>}
                <button onClick={handleConnectAndRedirect}>
                    <img className="dApp-button" src={open_dapp} alt='Open dApp' />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
