import { useState } from "react";
import "../App.css";

const RecycleCrew = () => {
  const [flightID, setFlightID] = useState("");

  async function handleClick() {
    if (!flightID) {
      alert("Invalid Flight ID");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/recycle_crew?" +
        new URLSearchParams({ ip_flightID: flightID })
    );
    const data = await res.json();
    alert(data.message);
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
        <button onClick={handleClick}>Recycle</button>
      </div>
    </div>
  );
};

export default RecycleCrew;
