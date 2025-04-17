import { useEffect, useState } from "react";

export interface DepartureInfo {
  departing_from: string;
  num_flights: number;
  flight_list: string;
  earliest_arrival: string;
  latest_arrival: string;
  airplane_list: string;
}

const FlightsOnTheGround = () => {
  const [flightData, setFlightData] = useState<DepartureInfo[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/flight_on_ground");
      const data = await res.json();
      setFlightData(data);
    }
    getData();
  }, []);
  return (
    <div className="table-container">
      <h2 className="table-title">Departure Info</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>Departing From</th>
            <th># Flights</th>
            <th>Flight List</th>
            <th>Earliest Arrival</th>
            <th>Latest Arrival</th>
            <th>Airplane List</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((item, index) => (
            <tr key={index}>
              <td>{item.departing_from}</td>
              <td>{item.num_flights}</td>
              <td>{item.flight_list.replace(/_/g, " ")}</td>
              <td>{item.earliest_arrival}</td>
              <td>{item.latest_arrival}</td>
              <td>{item.airplane_list.replace(/_/g, " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsOnTheGround;
