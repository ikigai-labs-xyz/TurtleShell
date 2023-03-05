import React from 'react';
import { redirect } from "react-router-dom";
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';

const Table = ({ contracts }) => {
  const navigate = useNavigate();

  const chooseContract = (contract) => {
    navigate(`/new-audit/initialize-audit/${contract.contract_address}`);
  }

  return (
    <table className="table-auto text-white">
      <thead>
        <tr>
          <th className="px-4 py-2">Network</th>
          <th className="px-4 py-2">Contract Address</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Choose</th>
        </tr>
      </thead>
      <tbody>
        {
          contracts.length === 0 ? 
          <p>No contracts</p>
          :
          <>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td className="px-4 py-2">{contract.network}</td>
              <td className="px-4 py-2">{contract.contract_address}</td>
              <td className="px-4 py-2">{contract.date}</td>
              <td className="px-4 py-2">
                  <Button onClick={() => chooseContract(contract)}><p>Choose</p></Button>
              </td>
            </tr>
          ))}
          </>
        }
      </tbody>
    </table>
  )
}

export default Table;
