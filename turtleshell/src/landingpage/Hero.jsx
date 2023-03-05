import React from 'react';
import hero from '../assets/turtle.svg';
import infographic from '../assets/infographic.svg';
import './Hero.css';
import 'animate.css';
import { TypeAnimation } from 'react-type-animation';



const Hero = () => {
  return (
    
    <div className='Hero-Section'>
    
        <div className="hero-text">
        

        <TypeAnimation
          // Same String at the start will only be typed once, initially
          sequence={[
          'Smart Contract Audits democratized',
          1000,
          'Smart Contract Audits for free',
          1000,
          'Smart Contract Audits for everyone',
          1000,
          'Smart Contract Audits performed by ML',
          1000,
          ]}
          speed={30} // Custom Speed from 1-99 - Default Speed: 40
          style={{ fontSize: '1em' }}
          wrapper="span" // Animation will be rendered as a <span>
          repeat={Infinity} // Repeat this Animation Sequence infinitely
        />

        </div>

        <div>

        <img src={infographic}
             alt='Infographic'
             className='hero-image' />
        </div>
      
  </div>
  );
}

export default Hero;