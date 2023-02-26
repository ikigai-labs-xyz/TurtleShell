import React from 'react';
import './Footer.css';
import Logo from '../../../assets/TurtleShell_Logo_Small.svg';
import FAQ from '../../../assets/FAQ.svg';
import Twitter from '../../../assets/Twitter.svg';
import Discord from '../../../assets/Discord.svg';


const Footer = () => {
  return (

    <div className='Footer-Section'>

    <div className='Footer-Row'>

      <div >
         <img className='footer-logo'src={Logo} alt='Logo'/>
      </div>
        
        <div className='footer-text'>
            <p>
              made with ❤️  @ ETHDenver 🌈🦬 
            </p>

            <p>
              by the Team of ikigai Labs & MetaMafia
            </p>
            <div className='footer-text-small'>
            <p>
            © 2023 TurtleShell by ikigai Labs OÜ, Pärnu mnt. 139c-14, Tallinn, 11317, Estonia.
            <p>All rights reserved.</p>
            </p>
          </div>
        </div>


        <div className='Links-Column'>
            
            <a href="https://www.youtube.com/watch?v=k85mRPqvMbE">
              <img
                  className='Links'
                  src={FAQ}
                  alt='FAQ'
              />
              </a>

              <a href="https://twitter.com/metamafia_ooo">
              <img
                  className='Links'
                  src={Twitter}
                  alt='Twitter'
              />
              </a>

              <a href="https://discord.com/">
              <img
                  className='Links'
                  src={Discord}
                  alt='Discord'
              />
              </a>
        </div>
        

      
     </div>

 </div>

  );
}

export default Footer;