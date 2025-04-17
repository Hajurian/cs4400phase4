import React, { useEffect, useState } from "react";

export interface FlightInfo {
  departing_from: string;
  arriving_at: string;
  num_flights: number;
  flight_list: string; // e.g. "af_19,km_16"
  earliest_arrival: string; // e.g. "14:00:00"
  latest_arrival: string; // e.g. "17:00:00"
  airplane_list: string; // e.g. "plane_28,plane_13"
}
const FlightsInTheAir = () => {
  const [flightData, setFlightData] = useState<FlightInfo[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/flight_in_air");
      const data = await res.json();
      setFlightData(data);
    }
    getData();
  }, []);

  return (
    <div className="table-container">
      <h2 className="table-title">Flight Schedule</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>Departing From</th>
            <th>Arriving At</th>
            <th># Flights</th>
            <th>Flight List</th>
            <th>Earliest Arrival</th>
            <th>Latest Arrival</th>
            <th>Airplane List</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((flight, index) => (
            <tr key={index}>
              <td>{flight.departing_from}</td>
              <td>{flight.arriving_at}</td>
              <td>{flight.num_flights}</td>
              <td>{flight.flight_list.replace(/_/g, " ")}</td>
              <td>{flight.earliest_arrival}</td>
              <td>{flight.latest_arrival}</td>
              <td>{flight.airplane_list.replace(/_/g, " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FlightsInTheAir;
