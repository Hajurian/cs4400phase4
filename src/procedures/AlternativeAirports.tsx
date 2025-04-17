import { useEffect, useState } from "react";

type AirportInfo = {
  city: string;
  state: string;
  country: string;
  num_airports: number;
  airport_code_list: string;
  airport_name_list: string;
};

const AlternativeAirports = () => {
  const [airportData, setAirportData] = useState<AirportInfo[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/alternative_airports");
      const data = await res.json();
      setAirportData(data);
    }
    getData();
  }, []);
  return (
    <div className="table-container">
      <h2 className="table-title">Airport Data</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th># Airports</th>
            <th>Airport Codes</th>
            <th>Airport Names</th>
          </tr>
        </thead>
        <tbody>
          {airportData.map((item, index) => (
            <tr key={index}>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
              <td>{item.num_airports}</td>
              <td>{item.airport_code_list}</td>
              <td>{item.airport_name_list.replace(/_/g, " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlternativeAirports;
