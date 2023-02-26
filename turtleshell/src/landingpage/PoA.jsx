import React from 'react';
import SBTs from '../assets/SBT_Badges.svg';
import Button from '../assets/getting-started-button.svg';
import './PoA.css';

const PoA = () => {
return (
<div className='SBT_Section'>

    
<div className='PoA-Section'>
        
        <div className='PoA-text'>
            Mint your<span className='orange-text'> Proof-of-Audit</span>
        </div>

        <div className='PoA-subtext'>
        an ERC-5114 Soulbound Token proving you Smart Contract has been audited by TurtleShell
        </div>

        <img className='PoA-image'
             src={SBTs} alt='Proof-of-Audit SBT'
        />

        <a href= "https://www.youtube.com/watch?v=qrxv0JNVtgY" >
        <img className='getting-started'
             src={Button}
             alt='Getting Started'
        />
        </a>
    
        
</div>

</div>

);
}

export default PoA;