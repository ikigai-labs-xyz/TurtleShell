import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImgUrlIpfs } from '../utils.js';
import BadgeSvg from '../components/BadgeSvg.jsx';

const MintProof = () => {
  const { id, hash }  = useParams();
  const [ipfsUrl, setIpfsUrl] = useState('');

  useEffect(() => {
    if (id && hash) {
      async function getImgUrl(ipfsHash) {
        const url = await getImgUrlIpfs(ipfsHash);
        setIpfsUrl(url);
      }
      getImgUrl(hash);
      console.log(id, hash)
    }
  }, [id, hash])

  return (
    <div className='text-white'>
      <h1>Mint Proof</h1>
      {
        ipfsUrl ? <img src={ipfsUrl} /> : <p>Loading...</p>
      }
      <BadgeSvg />
    </div>
  );
}

export default MintProof;