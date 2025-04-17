import { useState } from "react";
import "../App.css";

const FlightLanding = () => {
  const [flightID, setFlightID] = useState("");

  async function handleClick() {
    if (!flightID) {
      alert("Flight ID is required");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/land_flight?" +
        new URLSearchParams({
          ip_flightID: flightID,
        })
    );

    const data = await res.json();
    if (data.message instanceof Array) {
      alert("Flight landing failed");
    } else {
      alert("Flight landed successfully");
    }
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input
          type="text"
          value={flightID}
          onChange={(e) => setFlightID(e.target.value)}
        />
      </div>

      <div className="inputs">
        <button onClick={handleClick}>Land</button>
      </div>
    </div>
  );
};

export default FlightLanding;
