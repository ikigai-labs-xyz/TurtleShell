import react from "react"
import {useState} from "react"
import down from "../assets/down-icon.svg"

import "./Dropdown.css";

function Dropdown() {

    const [isActive, setIsActive] = useState(false);
  return (

    <div className="dropdown">
        
        <div className="dropdown-btn align-middle-row" 
             onClick={(e) =>
                setIsActive(!isActive)}
        >
            Choose a Contract
            <span>
                <img
                    src={down}
                    alt="down"
                />
            </span>
        </div>
        
        {isActive && (
            <div className="dropdown-content">
                <div className="dropdown-item">Replace with Contract Address from API fetch</div>
                <div className="dropdown-item">Replace with Contract Address from API fetch</div>
                <div className="dropdown-item">Replace with Contract Address from API fetch</div>
            </div>
        )}

    </div>
   
  );
}

export default Dropdown