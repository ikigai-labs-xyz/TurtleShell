import { useState } from 'react'
import logo from './assets/logo.svg'
import './App.css'
import axios from 'axios';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/engines/davinci/generate';

const MOCKMLDATA = [
  {
    vulnerability: "vun 1",
    function: "func1()",
    severity: "high"
  },
  {
    vulnerability: "vun 2",
    function: "transfer()",
    severity: "med"
  },
  {
    vulnerability: "vun 3",
    function: "func3()",
    severity: "low"
  }
]


async function getData(){

  axios.post(API_URL, {
    prompt: 'Hello, world!',
    max_tokens: 5,
    n: 1
  }, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
      }
  }).then(response => {
      console.log("RESPONSE" + response.data.choices[0].text);
  }).catch(error => {
      console.log("ERROR: " + error);
  });

}



function Finding(props) {
  getData();
  const { vulnerability, func, severity } = props;
  return (
    <tr>
      <td>{vulnerability}</td>
      <td>{func}</td>
      <td>{severity}</td>
    </tr>
  )
}

function App() {
  console.log("aaa");
  
  const [data] = useState({
    Project_Name: "Defi protocol",
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

      <h2>Table of Contents</h2>
      <p></p>
      <h3>1. Introduction</h3>
      <p></p>
      <h3>2. Scope</h3>
      <p></p>
      <h3>3. Findings</h3>
      <table>
        <thead>
          <tr>
            <th>Vulnerability</th>
            <th>Function</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {MOCKMLDATA.map((item, index) => (
            <Finding
              key={index}
              vulnerability={item.vulnerability}
              func={item.function}
              severity={item.severity}
            />
          ))}
        </tbody>
      </table>
      <h3>6. Appendix</h3>
    </div>
  );
}

export default App;
