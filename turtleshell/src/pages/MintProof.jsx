import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getImgUrlIpfs } from "../utils.js"
import BadgeSvg from "../components/BadgeSvg.jsx"

const MintProof = () => {
    const { id, hash, auditDetailsParsed } = useParams()
    const [ipfsUrl, setIpfsUrl] = useState("")

    const auditDetails = JSON.parse(auditDetailsParsed)

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
        </div>
    )
}

export default MintProof
