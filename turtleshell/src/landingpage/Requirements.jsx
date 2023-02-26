import React from 'react'
import './Requirements.css'
import textbox from '../assets/text-box.svg'

const Requirements = () => {
  return (
    <div className='Requirements-Section'>

        <div className="requirements-column">
            <div className="text-box">
                
                <div className="text-content">
                    <div className="h1">
                        Requirements
                    </div>
                    <div className="h2">
                        <p>
                            <li>
                            Smart Contract is deployed on mainnet or testnet of supported a supported Chain
                            </li>
                            <li>
                            Verify & Publish your Smart Contracts Source Code to the Chains Blockexplorer (e.g. Etherscan)
                            </li>
                        </p>
                    </div>
                    <div className="h3">
                        Need Help? More information on how to make your code eligible for our Audits can be found in our Docs☇
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    
    
    
  )
}

export default Requirements