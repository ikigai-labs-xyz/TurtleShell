import React, {useState, useEffect, useRef} from 'react';
import GoPlusMonitor from './GoPlusMonitor'
import Dropdown from './Dropdown';
import axios from 'axios';



function SecurityMonitor() {
  const [contractAddress, setContractAddress] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  // TODO: fetch contract addresses

  // "1" is the chainId for Ethereum Mainnet
  const chainId = 1;
  const goPlusUrl = `https://api.gopluslabs.io/api/v1/address_security/${contractAddress}?chain_id=${chainId}`;

  useEffect(() => {
    setLoading(true);
    axios.get(goPlusUrl)
    .then(res => {
      setLoading(false);
      setData(res.data);
    })
  }, [contractAddress]);

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <>
    <h1>Security Monitor</h1>
    <Dropdown />
    {data && <GoPlusMonitor data={data.result} />}
    </>
  )
}

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}

export default SecurityMonitor