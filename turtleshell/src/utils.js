const getIpfsUrl = (tokenURI) => {
  return tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
}

const BACKEND_API_URL = "http://localhost:3333";

const ML_MODEL_URL = "http://34.214.92.53:8511/v1/api/aduit";

const getImgUrlIpfs = async (hash) => {
  const ipfsHash = `ipfs://${hash}`
  const requestURL = ipfsHash.replace("ipfs://", "https://ipfs.io/ipfs/")
  const ipfsHashResponse = await (await fetch(requestURL)).json()
  const imageURI = ipfsHashResponse.image
  const svgURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
  console.log(svgURL);

  return imgPath;
}

export { getIpfsUrl, getImgUrlIpfs, BACKEND_API_URL, ML_MODEL_URL };