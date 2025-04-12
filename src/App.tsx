import { useState } from "react";
import "./App.css";

function App() {
  const procedures = [
    { name: "add_airplane", number: 1 },
    { name: "add_airport", number: 2 },
    { name: "add_person", number: 3 },
    { name: "grant_or_revoke_pilot_license", number: 4 },
    { name: "offer_flight", number: 5 },
    { name: "flight_landing", number: 6 },
    { name: "flight_takeoff", number: 7 },
    { name: "passengers_board", number: 8 },
    { name: "passengers_disembark", number: 9 },
    { name: "assign_pilot", number: 10 },
    { name: "recycle_crew", number: 11 },
    { name: "retire_flight", number: 12 },
    { name: "simulation_cycle", number: 13 },
    { name: "flights_in_the_air", number: 14 },
    { name: "flights_on_the_ground", number: 15 },
    { name: "people_in_the_air", number: 16 },
    { name: "people_on_the_ground", number: 17 },
    { name: "route_summary", number: 18 },
    { name: "alternative_airports", number: 19 },
  ];
  const [procedure, setProcedure] = useState(procedures[0]);
  const handleChange = (e: { target: { value: any } }) => {
    const selectedName = e.target.value;
    const selectedProc = procedures.find((proc) => proc.name === selectedName);
    if (selectedProc) {
      setProcedure(selectedProc);
    }
  };
  return (
    <>
      <header className="header">
        <h1>Airplane management system</h1>
        <select value={procedure.name} onChange={handleChange}>
          {procedures.map((proc) => (
            <option key={proc.number} value={proc.name}>
              {proc.name}
            </option>
          ))}
        </select>
      </header>
      <main></main>
    </>
  );
}

export default App;
