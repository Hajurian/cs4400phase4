import { useState } from "react";
import "./App.css";
import AddAirplane from "./procedures/AddAirplane";
import AddAirport from "./procedures/AddAirport";
import AddPerson from "./procedures/AddPerson";
import FlightLanding from "./procedures/FlightLanding";
import FlightTakeoff from "./procedures/FlightTakeoff";
import GrantRevokePilotLicense from "./procedures/GrantRevokePilotLicense";
import OfferFlight from "./procedures/OfferFlight";
import AlternativeAirports from "./procedures/AlternativeAirports";
import AssignPilot from "./procedures/AssignPilot";
import FlightsInTheAir from "./procedures/FlightsInTheAir";
import FlightsOnTheGround from "./procedures/FlightsOnTheGround";
import PassengersBoard from "./procedures/PassengersBoard";
import PassengersDisembark from "./procedures/PassengersDisembark";
import PeopleInTheAir from "./procedures/PeopleInTheAir";
import PeopleOnTheGround from "./procedures/PeopleOnTheGround";
import RecycleCrew from "./procedures/RecycleCrew";
import RetireFlight from "./procedures/RetireFlight";
import RouteSummary from "./procedures/RouteSummary";
import SimulationCycle from "./procedures/SimulationCycle";

async function getData() {
  const res = await fetch("http://localhost:5000");
  console.log(await res.json());
}

function App() {
  getData();
  const renderProcedureComponent = () => {
    switch (procedure.number) {
      case 1:
        return <AddAirplane />;
      case 2:
        return <AddAirport />;
      case 3:
        return <AddPerson />;
      case 4:
        return <GrantRevokePilotLicense />;
      case 5:
        return <OfferFlight />;
      case 6:
        return <FlightLanding />;
      case 7:
        return <FlightTakeoff />;
      case 8:
        return <PassengersBoard />;
      case 9:
        return <PassengersDisembark />;
      case 10:
        return <AssignPilot />;
      case 11:
        return <RecycleCrew />;
      case 12:
        return <RetireFlight />;
      case 13:
        return <SimulationCycle />;
      case 14:
        return <FlightsInTheAir />;
      case 15:
        return <FlightsOnTheGround />;
      case 16:
        return <PeopleInTheAir />;
      case 17:
        return <PeopleOnTheGround />;
      case 18:
        return <RouteSummary />;
      case 19:
        return <AlternativeAirports />;
      default:
        return <div>Please select a procedure</div>;
    }
  };
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
      <main>{renderProcedureComponent()}</main>
    </>
  );
}
export default App;
