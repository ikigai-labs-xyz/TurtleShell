import { useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'

function App() {

  const [data] = useState({
    Project_Name: "Ovix Protocol",
    date: "06/03/2023",
    contract_address: "0xD08E331Ba5Da695d8FB298231868D039Ba3211D6",
    Network: "Goerli",
    contract_creator: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    Vulnerbilities_found: "1",
  });

  return (
    <div className="App">
      <img src={logo} alt="" />
      <h1>Audit Report</h1>
      <h2>for {data.Project_Name}</h2>
      <h3>{data.date}</h3>
      <h3>Contract Address: {data.contract_address}</h3>
      <h3>Network: {data.Network}</h3>
      <h3>Contract Creator: {data.contract_creator}</h3>
      <h3>Vulnerbilities Found: {data.Vulnerbilities_found}</h3>

      <h2>Table of Contents</h2>
      <p></p>
      <h3>1. Introduction</h3>
      <p></p>
      <h3>2. Scope</h3>
      <p></p>
      <h3>3. Findings</h3>
      <p></p>
      <h3>4. Conclusion</h3>
      <p></p>
      <h3>5. Recommendations</h3>
      <p></p>
      <h3>6. Appendix</h3>

    </div>
  );
}

export default App;
