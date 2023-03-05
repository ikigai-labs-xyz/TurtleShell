import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImgUrlIpfs } from '../utils.js';
import BadgeSvg from '../components/BadgeSvg.jsx';
import Button from '../components/Common/Button.jsx';
import useSignature from '../hooks/useSignature.js';
import { useReward } from 'react-rewards';

const MintProof = () => {
  const { id, hash }  = useParams();
  const [ipfsUrl, setIpfsUrl] = useState('');
  const { data, error, loading, createSignature } = useSignature();
  const [mintSuccess, setMintSuccess] = useState(false);
  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  useEffect(() => {
    if (mintSuccess) {
      reward();
    }
  }, [mintSuccess]);

  const handleCreateSignature = async () => {
    await createSignature(hash, id);
  };

  return (
    <div className='text-white'>
      <h1>Mint Proof</h1>
      {
        ipfsUrl ? <img src={ipfsUrl} /> : <p>Loading...</p>
      }
      <BadgeSvg />
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
  );
}

export default MintProof;