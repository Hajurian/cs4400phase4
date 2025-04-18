import { useState } from "react";
import "../App.css";

const AssignPilot = () => {
  const [personID, setPersonID] = useState("");
  const [flightID, setFlightID] = useState("");

  async function handleClick() {
    if (!personID || !flightID) {
      alert("Both Person ID and Flight ID are required");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/assign_pilot?" +
        new URLSearchParams({ ip_personID: personID, ip_flightID: flightID })
    );
    const data = await res.json();
    alert(data.message);
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Person ID</label>
        <input
          type="text"
          value={personID}
          onChange={(e) => setPersonID(e.target.value)}
        />
        <label>Flight ID</label>
        <input
          type="text"
          value={flightID}
          onChange={(e) => setFlightID(e.target.value)}
        />
      </div>

      <div className="inputs">
        <button onClick={handleClick}>Assign</button>
      </div>
    </div>
  );
};

export default AssignPilot;
