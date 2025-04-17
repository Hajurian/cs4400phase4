import { useState } from "react";
import "../App.css";

const AddAirplane = () => {
  const [airline, setAirline] = useState("");
  const [tailNum, setTailNum] = useState("");
  const [seatCap, setSeatCap] = useState("");
  const [speed, setSpeed] = useState("");
  const [locationID, setLocationID] = useState("");
  const [planeType, setPlaneType] = useState("");
  const [maintained, setMaintained] = useState("");
  const [model, setModel] = useState("");
  const [neo, setNeo] = useState("");

  async function handleClick() {
    if (
      //null check
      !airline ||
      !tailNum ||
      !seatCap ||
      !speed ||
      !locationID ||
      !planeType
    ) {
      alert("Invalid parameters");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/add_airplane?" +
        new URLSearchParams({
          ip_airlineID: airline,
          ip_tail_num: tailNum,
          ip_seat_capacity: seatCap,
          ip_speed: speed,
          ip_locationID: locationID,
          ip_plane_type: planeType,
          ip_model: model,
          ip_maintenanced: maintained,
          ip_neo: neo.toLowerCase(),
        })
    );
    const data = await res.json();
    if (data.message instanceof Array) {
      alert("add failed");
    } else {
      alert("Successfully added plane");
    }
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Airline ID</label>
        <input
          type="text"
          value={airline}
          onChange={(e) => setAirline(e.target.value)}
        />
        <label>Tail Num</label>
        <input
          type="text"
          value={tailNum}
          onChange={(e) => setTailNum(e.target.value)}
        />
        <label>Seat Cap</label>
        <input
          type="text"
          value={seatCap}
          onChange={(e) => setSeatCap(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>Speed</label>
        <input
          type="text"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <label>LocationID</label>
        <input
          type="text"
          value={locationID}
          onChange={(e) => setLocationID(e.target.value)}
        />
        <label>Plane Type</label>
        <input
          type="text"
          value={planeType}
          onChange={(e) => setPlaneType(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>Maintained</label>
        <input
          type="text"
          value={maintained}
          onChange={(e) => setMaintained(e.target.value)}
        />
        <label>Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <label>Neo</label>
        <input
          type="text"
          value={neo}
          onChange={(e) => setNeo(e.target.value)}
        />
      </div>
      <div className="inputs">
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddAirplane;
