import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Container from "../components/Container"
import { useNetwork } from "wagmi"
import axios from "axios"
import Button from "../components/Common/Button"
import useMLModel from "../hooks/useMLModel"
import { GET_ALL_AUDIT_BADGES } from "../graphql/auditBadges"
import { useLazyQuery } from "@apollo/client"
import usePinata from "../hooks/usePinata"
import { useNavigate } from "react-router-dom"

const InitializeAudit = () => {
    const { id } = useParams()
    const { chain, chains } = useNetwork()
    const [chainImg, setChainImg] = useState(null)
    const { data, error, loading, fetchMLModel } = useMLModel()
    const [
        getAuditBages,
        { data: auditBadges, error: auditBadgesError, loading: auditBadgesLoading },
    ] = useLazyQuery(GET_ALL_AUDIT_BADGES)
    const {
        fetchData: fetchHash,
        data: hashData,
        error: hashError,
        loading: hashLoading,
    } = usePinata()
    const navigate = useNavigate()
    const [auditDetails, setAuditDetails] = useState({})

    const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/`

    useEffect(() => {
        if (chain) {
            axios.get(`${coingeckoUrl}${chain.name.toLowerCase()}`).then((res) => {
                setChainImg(res.data.image.small)
            })
        }
    }, [chain])

    useEffect(() => {
        if (auditBadges) {
            let tokenId = auditBadges.auditBadges ? auditBadges.auditBadges.length : 0
            const auditDetailsLocal = getAuditDetails(data, tokenId)
            setAuditDetails(auditDetailsLocal)
            console.log("audit", auditDetailsLocal)
            fetchHash(auditDetailsLocal)
        }
    }, [auditBadges])

    useEffect(() => {
        if (hashData) {
            navigateToProof(id, hashData, JSON.stringify(auditDetails))
        }
    }, [hashData])

    const getSourceCodeByAddress = async (address) => {
        // return the source code of the contract
        const res = await axios.get(
            `https://api-goerli.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=${
                import.meta.env.VITE_EHTERSCAN_API_KEY
            }}`
        )
        const sourceCode = res.data.result[0].SourceCode
        return sourceCode
    }

    const startAudit = async () => {
        // get source code from etherscan
        const returnedSourceCode = await getSourceCodeByAddress(id)
        // call ML model
        const res = await fetchMLModel(returnedSourceCode)
        getAuditBages()
    }

    const getAuditDetails = (mlResults, tokenId) => {
        const networkName = "goerli"
        const contractAddr = id
        const riskLevel = getRisk(mlResults)
        const vulnerabilityTypes = getVulnerabilityTypes(mlResults)
        const protocolName = "turtleshell"
        const timestamp = Math.floor(new Date().getTime() / 1000)

        return {
            networkName,
            contractAddr,
            riskLevel,
            types: vulnerabilityTypes,
            timestamp,
            tokenId,
            protocolName,
        }
    }

    const highVulnerabiltyTypes = ["overflow", "access", "reentrency"]

    const getRisk = (mlResult) => {
        for (let i = 0; i < mlResult.length; i++) {
            if (highVulnerabiltyTypes.includes(mlResult[i].vulnerabilityType.toLowerCase())) {
                return "High"
            }
        }
        return "Low"
    }

    // const getVulnerabilityTypes = (mlResult) => {
    //     let types = ""
    //     for (let i = 0; i < mlResult.length; i++) {
    //         if (i !== 0) types += " "
    //         types += mlResult[i].vulnerabilityType
    //     }
    //     return types
    // }

    const getVulnerabilityTypes = (mlResult) => {
        return mlResult.length
    }

    const navigateToProof = (contractAddr, hash, auditDetails) => {
        navigate(`/new-audit/mint-proof/${contractAddr}/${hash}/${auditDetails}`)
    }

    return (
        <div className="text-white text-center">
            <h1 className="mb-3">Initialize Audit</h1>
            <Container className="max-w-xl">
                <div className="flex flex-col items-center text-[#AEABD8] justify-center p-4">
                    <div className="my-4">
                        <p>Contract Address</p>
                        <p className="text-white">{id}</p>
                    </div>
                    <div className="my-4">
                        <p>Contract Creator</p>
                        <p className="text-white">{id}</p>
                    </div>
                    <div className="my-4">
                        <p>Network</p>
                        <div className="text-white flex flex-row">
                            {chainImg && (
                                <img src={chainImg} className="w-6 h-6 mr-2 rounded-full" />
                            )}
                            {chain && <span>{chain.name}</span>}
                        </div>
                    </div>
                </div>
            </Container>
            <div className="mt-10 flex items-center justify-center">
                <Button onClick={startAudit}>Start Audit</Button>
            </div>
        </div>
    )
}

export default InitializeAudit
