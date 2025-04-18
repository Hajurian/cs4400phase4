import { useState } from "react";
import "../App.css";
//DONE

const AddAirport = () => {
  const [airportID, setAirportID] = useState("");
  const [airportName, setAirportName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [locationID, setLocationID] = useState("");

  async function handleClick() {
    if (
      !airportID ||
      !airportName ||
      !city ||
      !state ||
      !country ||
      !locationID
    ) {
      alert("Invalid parameters");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/add_airport?" +
        new URLSearchParams({
          ip_airportID: airportID,
          ip_airport_name: airportName,
          ip_city: city,
          ip_state: state,
          ip_country: country,
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
        <label>Airport ID</label>
        <input
          type="text"
          value={airportID}
          onChange={(e) => setAirportID(e.target.value)}
        />
        <label>Airport Name</label>
        <input
          type="text"
          value={airportName}
          onChange={(e) => setAirportName(e.target.value)}
        />
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>Location ID</label>
        <input
          type="text"
          value={locationID}
          onChange={(e) => setLocationID(e.target.value)}
        />
      </div>
      <div className="inputs">
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddAirport;
