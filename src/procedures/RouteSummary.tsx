import { useState, useEffect } from "react";

export interface FlightRoute {
  route: string;
  num_legs: number;
  leg_sequence: string;
  route_length: string;
  num_flights: number;
  flight_list: string | null;
  airport_sequence: string;
}

const RouteSummary = () => {
  const [flightData, setFlightData] = useState<FlightRoute[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/route_summary");
      const data = await res.json();
      setFlightData(data);
    }
    getData();
  }, []);
  return (
    <div className="table-container">
      <h2 className="table-title">Flight Routes</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>Route</th>
            <th># Legs</th>
            <th>Leg Sequence</th>
            <th>Route Length (km)</th>
            <th># Flights</th>
            <th>Flight List</th>
            <th>Airport Sequence</th>
          </tr>
        </thead>
        <tbody>
          {flightData.map((item, index) => (
            <tr key={index}>
              <td>{item.route}</td>
              <td>{item.num_legs}</td>
              <td>{item.leg_sequence}</td>
              <td>{item.route_length}</td>
              <td>{item.num_flights}</td>
              <td>{item.flight_list || "N/A"}</td>
              <td>{item.airport_sequence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteSummary;
