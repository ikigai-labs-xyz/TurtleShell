import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getImgUrlIpfs } from "../utils.js"
import BadgeSvg from "../components/BadgeSvg.jsx"
import { useReward } from "react-rewards"
import Button from "../components/Common/Button.jsx"
import useSignature from "../hooks/useSignature.js"
// import useMint from "../hooks/useMint.js"
import abi from "../../abi.json"

import { usePrepareContractWrite, useContractWrite } from "wagmi"

const MintProof = () => {
    const { id, hash, auditDetailsParsed } = useParams()
    const [ipfsUrl, setIpfsUrl] = useState("")
    const auditDetails = JSON.parse(auditDetailsParsed)
    const { reward, isAnimating } = useReward("rewardId", "confetti")
    const { createSignature, data: signature } = useSignature()

    const [sentTx, setSentTx] = useState(false)

    const mintRequest = {
        to: auditDetails.contractAddr,
        tokenURI: hash,
    }
    const args = [mintRequest, signature]

    const { config } = usePrepareContractWrite({
        address: "0xeb0c89B065Cf1a498A4B677a04Bb69EBdD641047",
        abi: abi,
        functionName: "mint",
        args,
    })
    const { data: txData, isLoading, isSuccess: mintSuccess, write } = useContractWrite(config)

    console.log("tx data", txData)

    useEffect(() => {
        if (mintSuccess) {
            reward()
        }
    }, [mintSuccess])

    useEffect(() => {
        if (id && hash) {
            async function getImgUrl(ipfsHash) {
                const url = await getImgUrlIpfs(ipfsHash)
                setIpfsUrl(url)
            }
            getImgUrl(hash)
        }
    }, [id, hash])

    useEffect(() => {
        write?.()
    }, [signature, write])

    const initiateMint = async () => {
        await createSignature(hash, auditDetails.contractAddr)
    }

    return (
        <div className="text-white">
            <h1>Mint Proof</h1>
            {ipfsUrl ? <img src={ipfsUrl} /> : <p>Loading...</p>}
            <BadgeSvg
                TOKEN_ID={auditDetails.tokenId}
                NETWORK="GOERLI"
                RISK_LEVEL={auditDetails.riskLevel}
                TIMESTAMP={auditDetails.timestamp}
                CONTRACT_ADDRESS={auditDetails.contractAddr}
                TYPES_VULNERABILITIES={auditDetails.types}
            />
            <div className="flex items-center justify-center">
                {!mintSuccess && <Button onClick={initiateMint}>Mint</Button>}
            </div>
            {mintSuccess && (
                <div className="flex items-center justify-center text-white space-y-4 flex-col">
                    <h2 className="text-xl relative">
                        Minted Successfully
                        <span
                            id="rewardId"
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        />
                    </h2>
                    {txData && (
                        <h3>
                            <a
                                href={`https://goerli.etherscan.io/tx/${txData.hash}`}
                                target="_blank"
                            >
                                View on Explorer
                            </a>
                        </h3>
                    )}
                </div>
            )}
        </div>
    )
}

export default MintProof
