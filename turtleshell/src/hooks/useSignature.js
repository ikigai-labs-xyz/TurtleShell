import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_API_URL } from '../utils';

const useSignature = ({ hash, contractAddress }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // make a get request to the backend to fetch signature by passing hash and contractAddress as params
        const response = await axios.get(`${BACKEND_API_URL}/signature?ipfsHash=ipfs://${hash}&contractAddress=${contractAddress}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [hash, contractAddress]);

  return { data, error, loading };
};

export default useSignature;
