import { useState } from "react";
import "../App.css";

const OfferFlight = () => {
  const [flightID, setFlightID] = useState("");
  const [routeID, setRouteID] = useState("");
  const [supportAirline, setSupportAirline] = useState("");
  const [progress, setProgress] = useState("");
  const [nextTime, setNextTime] = useState("");
  const [supportTail, setSupportTail] = useState("");
  const [cost, setCost] = useState("");

  async function handleClick() {
    if (
      !flightID ||
      !routeID ||
      !supportAirline ||
      !progress ||
      !nextTime ||
      !supportTail ||
      !cost
    ) {
      alert("Invalid parameters");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/offer_flight?" +
        new URLSearchParams({
          ip_flightID: flightID,
          ip_routeID: routeID,
          ip_support_airline: supportAirline,
          ip_progress: progress,
          ip_next_time: nextTime,
          ip_support_tail: supportTail,
          ip_cost: cost,
        })
    );

    const data = await res.json();
    if (data.message instanceof Array) {
      alert("Offer flight failed");
    } else {
      alert("Flight offered successfully");
    }
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Flight ID</label>
        <input
          type="text"
          value={flightID}
          onChange={(e) => setFlightID(e.target.value)}
        />
        <label>Route ID</label>
        <input
          type="text"
          value={routeID}
          onChange={(e) => setRouteID(e.target.value)}
        />
        <label>Support Airline</label>
        <input
          type="text"
          value={supportAirline}
          onChange={(e) => setSupportAirline(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>Progress</label>
        <input
          type="text"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />
        <label>Next Time</label>
        <input
          type="text"
          value={nextTime}
          onChange={(e) => setNextTime(e.target.value)}
        />
        <label>Support Tail</label>
        <input
          type="text"
          value={supportTail}
          onChange={(e) => setSupportTail(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>Cost</label>
        <input
          type="text"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
      <div className="inputs">
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default OfferFlight;
