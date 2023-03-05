import React from 'react';
import logo from '../assets/turtle.svg';
import open_dapp from '../assets/open-dApp-button.svg';
import './Navbar.css';

import { useAccount, useConnect } from 'wagmi'
import WalletBtn from '../dashboard/WalletBtn';

const Navbar = () => {

    const { connector: activeConnector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
      useConnect()
return (
<div className='Navbar'>

    <div className='navbar-row'>

        <div >
         <img className='navbar-logo'src={logo} alt='Logo'/>
        </div>

        <div className='navbar-text'>
            TrutleShell
        </div>
    
    </div>

    <div>
        <a href= "/new-audit/choose" >
            
        <WalletBtn/>
        </a>
        
    </div>

</div>

);
}

export default Navbar;