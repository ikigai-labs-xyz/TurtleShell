import { useState, useEffect } from 'react';
import React from 'react'
import '../styles/Contracts.css';
import { useAccount, useContract } from 'wagmi'
import axios from 'axios';
import { ethers } from 'ethers';
import Table from "../components/Contracts/Table";

const ChooseContracts = () => {
    const { address, isConnecting, isDisconnected } = useAccount()
    const [contracts, setContracts] = useState([]);
    const [contractsLoading, setContractLoading] = useState(true);

    // get default provider from ethers 
    const provider = new ethers.getDefaultProvider('goerli', {
      alchemy: import.meta.env.VITE_ALCHEMY_API_KEY,
    });

    const chainName = 'eth-goerli';
    const covalentAPI = `https://api.covalenthq.com/v1/${chainName}/address/${address}/transactions_v2/`;

    useEffect(() => {
      if (address) {
        // get contracts data from etherscan using axios
        axios.get(covalentAPI, {
          auth: {
            username: import.meta.env.VITE_COVALENT_API,
          }
        })
        .then(async(res) => {
            const contracts = res.data.data.items.filter(contract => !contract.to_address)
            const deployedContracts = [];
            // get transaction receipt for each contract from ethers.js
            for await (const contract of contracts) {
              const receipt = await provider.getTransactionReceipt(contract.tx_hash)
              // add contract to deployedContracts
              deployedContracts.push({
                network: 'Goerli',
                contract_address: receipt.contractAddress,
                date: contract.block_signed_at,
              })
            }
            setContracts(deployedContracts);
            setContractLoading(false);
          }
        )
      }
    }, [address])

    if (isConnecting || contractsLoading) {
      return <div>loading...</div>
    }

    return (
            <div className="">
                <div className='mt-14 mb-14 '>
                    <div className='main-text'>
                            Choose Smart Contract
                    </div>
                    <div className='sub-text'>
                        <p>
                            choose the Smart Contract you wanna Audit from the Wallet Address it has been deployed 
                        </p>
                        
                    </div>
                    
                </div>

                <div className='box'>
                    <div className='choose-header flex col-auto'>
                        <div className='choose-text ml-5 mt-2'>
                            deployed Contracts by {address}
                        </div>
                        </div>
                        <Table contracts={contracts} />
                    </div>
                    <div className='choose-subheader text-center'>
                    *if you wanna audit a non-EVM Contract, please connect other wallet
                    </div>
            </div>
        )
  };
export default ChooseContracts;

