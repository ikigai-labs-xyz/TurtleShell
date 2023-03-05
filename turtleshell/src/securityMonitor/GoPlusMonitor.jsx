import goplus from "../assets/goplus.svg"
import "./Security.css";
import OutputTableCell from "./OutputTableCell";


function GoPlusMonitor({ data, loading }) {

  const tableLabels = {
    "data_source": "Data Source",
    "honeypot_related_address": "Addresses Related to Honeypot",
    "phishing_activities": "Phishing Activities",
    "blackmail_activities": "Black Mail Activities",
    "stealing_attack": "Stealing Attack",
    "fake_kyc": "Fake KYC",
    "malicious_mining_activities": "Malicious Mining Activities",
    "darkweb_transactions": "Darkweb Transactions",
    "cybercrime": "Cybercrime",
    "money_laundering": "Money Laundering",
    "financial_crime": "Financial Crime",
    "blacklist_doubt": "Suspected Malicious Address",
    "contract_address": "Contract Address",
    "mixer": "Coin Mixer address",
    "sanctioned": "Sanctioned Address",
    "number_of_malicious_contracts_created": "Number of malicious contracts",
  }

  return (
    <>
      <div className="">
        <h1>{data?.setup} : {data?.delivery}
        </h1>
      </div>
      <div className="box align-middle-column">
        <div className="h1-text">
          Suspicious Acvtvity Monitor
        </div>
        <div className="align-middle-row pr-7 mt-1">
          <div>
            <img className="goplus-logo"
              src={goplus}
              alt="goplus"
            />
          </div>
          <div className="h2-text">
            powered by GoPlus Security
          </div>

        </div>
        <div className="align-right-row pr-7 mt-5">
          <div className="h3-text spacing">
            <table>
              <tbody>
              {Object.keys(tableLabels).map((key, index) => {
                return (
                  <tr key={index}>
                    <td className="text-left">{tableLabels[key]}</td>
                    <td><OutputTableCell output={parseInt(data[key]) === 1 ? "positive" : "negative"} loading={loading} /></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default GoPlusMonitor
