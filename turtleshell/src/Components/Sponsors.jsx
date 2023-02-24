import React from 'react';
import Logos from '../assets/Logo_Section.svg';
import './Sponsors.css';

const Sponsors = () => {
return (
<div className='Sponsors_Section'>

    <div className='sponsors-column'>
        <div className='sponsors-text'>
        Sponsors & Tech Stack we trust in
        </div>

        <img className='sponsors-image'
             src={Logos}
             alt='Sponsors'
        />
        

    </div>

</div>

);
}

export default Sponsors;