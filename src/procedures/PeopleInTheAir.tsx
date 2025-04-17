import { useEffect, useState } from "react";

export interface PeopleAir {
  departing_from: string;
  arriving_at: string;
  num_airplanes: number;
  airplane_list: string;
  flight_list: string;
  earliest_arrival: string;
  latest_arrival: string;
  num_pilots: number;
  num_passengers: number;
  joint_pilots_passengers: number;
  person_list: string;
}

const PeopleInTheAir = () => {
  const [people, setPeople] = useState<PeopleAir[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/people_in_air");
      const data = await res.json();
      setPeople(data);
    }
    getData();
  }, []);
  return (
    <div className="table-container">
      <h2 className="table-title">People In Air</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>Departing From</th>
            <th>Arriving At</th>
            <th># Airplanes</th>
            <th>Airplane List</th>
            <th>Flight List</th>
            <th>Earliest Arrival</th>
            <th>Latest Arrival</th>
            <th># Pilots</th>
            <th># Passengers</th>
            <th>Total People</th>
            <th>People IDs</th>
          </tr>
        </thead>
        <tbody>
          {people.map((item, index) => (
            <tr key={index}>
              <td>{item.departing_from}</td>
              <td>{item.arriving_at}</td>
              <td>{item.num_airplanes}</td>
              <td>{item.airplane_list.replace(/_/g, " ")}</td>
              <td>{item.flight_list.replace(/_/g, " ")}</td>
              <td>{item.earliest_arrival}</td>
              <td>{item.latest_arrival}</td>
              <td>{item.num_pilots}</td>
              <td>{item.num_passengers}</td>
              <td>{item.joint_pilots_passengers}</td>
              <td>{item.person_list}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleInTheAir;
