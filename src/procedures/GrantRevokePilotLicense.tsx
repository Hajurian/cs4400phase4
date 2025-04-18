import { useState } from "react";
import "../App.css";

const GrantRevokePilotLicense = () => {
  const [personID, setPersonID] = useState("");
  const [locationID, setLocationID] = useState("");

  async function handleClick() {
    if (!personID || !locationID) {
      alert("Invalid parameters");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/grant_revoke_pilot_license?" +
        new URLSearchParams({
          ip_personID: personID,
          ip_locationID: locationID,
        })
    );

    const data = await res.json();
    alert(data.message);
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <label>PersonID</label>
        <input
          type="text"
          value={personID}
          onChange={(e) => setPersonID(e.target.value)}
        />
        <label>LocationID</label>
        <input
          type="text"
          value={locationID}
          onChange={(e) => setLocationID(e.target.value)}
        />
      </div>

      <div className="inputs">
        <button onClick={handleClick}>Add / Revoke</button>
      </div>
    </div>
  );
};

export default GrantRevokePilotLicense;
