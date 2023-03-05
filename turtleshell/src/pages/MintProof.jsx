import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getImgUrlIpfs } from "../utils.js"
import BadgeSvg from "../components/BadgeSvg.jsx"
import { useReward } from 'react-rewards';
import Button from '../components/Common/Button.jsx';

const MintProof = () => {
    const { id, hash, auditDetailsParsed } = useParams()
    const [ipfsUrl, setIpfsUrl] = useState("")

    const auditDetails = JSON.parse(auditDetailsParsed)

    const [mintSuccess, setMintSuccess] = useState(false);
    const { reward, isAnimating } = useReward('rewardId', 'confetti');
  
    useEffect(() => {
      if (mintSuccess) {
        reward();
      }
    }, [mintSuccess]);

    useEffect(() => {
        if (id && hash) {
            async function getImgUrl(ipfsHash) {
                const url = await getImgUrlIpfs(ipfsHash)
                setIpfsUrl(url)
            }
            getImgUrl(hash)
            console.log(id, hash)
        }
    }, [id, hash])

    return (
        <div className="text-white">
            <h1>Mint Proof</h1>
            {ipfsUrl ? <img src={ipfsUrl} /> : <p>Loading...</p>}
            <BadgeSvg
                TOKEN_ID={auditDetails.tokenId}
                NETWORK_NAME={"GOERLI"}
                RISK_LEVEL={auditDetails.riskLevel}
                TIMESTAMP={auditDetails.timestamp}
                CONTRACT_ADDRESS={auditDetails.contractAddr}
                TYPES_VULNERABILITIES={auditDetails.types}
            />
            <div className='flex items-center justify-center'>
              {!mintSuccess && <Button onClick={handleCreateSignature}>Mint</Button>}
            </div>
            {mintSuccess && 
            <div className="flex items-center justify-center text-white">
              <h2 className='text-xl relative'>
                Minted Successfully
                <span id="rewardId" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)'}}/>
              </h2>
            </div>}
        </div>
    )
}

export default MintProof
