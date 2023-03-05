import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import Audits from '../components/Audits/Audits';

const MyAudits = () => {
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    if (address) {
      console.log(address)
    }
  },[address])

  if (isConnecting) {
    return <div>Connecting...</div>
  }

  return (
    <div>
      <h1>Audits</h1>
      {
        isDisconnected ? <div>Connect your wallet</div> : <Audits address={address} />
      }
    </div>
  )
}

export default MyAudits;