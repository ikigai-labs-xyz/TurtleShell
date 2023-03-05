import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_API_URL } from '../utils';

const useSignature = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const chainId = "5";

  const createSignature = async (hash, contractAddress) => {
    try {
      setLoading(true);
      const body = { chainId, contractAddress, ipfsHash: hash };
      // make a get request to the backend to fetch signature by passing hash and contractAddress as params
      const response = await axios.post(`${BACKEND_API_URL}/signature`, body);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  return { data, error, loading, createSignature };
};

export default useSignature;
