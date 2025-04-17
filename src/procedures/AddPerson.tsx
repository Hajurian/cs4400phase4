import { useState } from "react";
import "../App.css";

const AddPerson = () => {
  const [personID, setPersonID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [taxID, setTaxID] = useState("");
  const [locationID, setLocationID] = useState("");
  const [experience, setExperience] = useState("");
  const [miles, setMiles] = useState("");
  const [funds, setFunds] = useState("");

  async function handleClick() {
    if (!personID || !firstName || !lastName || !locationID) {
      alert("Invalid parameters");
      return;
    }

    const res = await fetch(
      "http://localhost:5000/add_person?" +
        new URLSearchParams({
          ip_personID: personID,
          ip_first_name: firstName,
          ip_last_name: lastName,
          ip_locationID: locationID,
          ip_taxID: taxID,
          ip_experience: experience,
          ip_miles: miles,
          ip_funds: funds,
        })
    );

    const data = await res.json();
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
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>LocationID</label>
        <input
          type="text"
          value={locationID}
          onChange={(e) => setLocationID(e.target.value)}
        />
        <label>TaxID</label>
        <input
          type="text"
          value={taxID}
          onChange={(e) => setTaxID(e.target.value)}
        />

        <label>Experience</label>
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>
      <div className="inputs">
        <label>Miles</label>
        <input
          type="text"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />
        <label>Funds</label>
        <input
          type="text"
          value={funds}
          onChange={(e) => setFunds(e.target.value)}
        />
      </div>
      <div className="inputs">
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default AddPerson;
