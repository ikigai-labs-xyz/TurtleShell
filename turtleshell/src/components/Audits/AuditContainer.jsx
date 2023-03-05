import { useEffect } from 'react';
import { useContractRead } from 'wagmi'
import abi from '../../../abi.json'
// import AuditNft from './AuditNft';

const AuditContainer = ({ auditBadge, address }) => {
  const { id, contractAddress, tokenId } = auditBadge;

  useEffect(() => {
    console.log(auditBadge)
  },[data])

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'tokenURI',
    args: [tokenId],
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {
        // data && <AuditNft tokenId={data.hash} />
      }
    </div>
  )
}

export default AuditContainer;