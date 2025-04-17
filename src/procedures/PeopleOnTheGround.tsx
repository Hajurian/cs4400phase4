import { useEffect, useState } from "react";

export interface PeopleGround {
  departing_from: string;
  airport: string;
  airport_name: string;
  city: string;
  state: string;
  country: string;
  num_pilots: number;
  num_passengers: number;
  joint_pilots_passengers: number;
  person_list: string;
}

const PeopleOnTheGround = () => {
  const [people, setPeople] = useState<PeopleGround[]>([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:5000/people_on_ground");
      const data = await res.json();
      setPeople(data);
    }
    getData();
  }, []);
  return (
    <div className="table-container">
      <h2 className="table-title">People on ground</h2>
      <table className="airport-table">
        <thead>
          <tr>
            <th>Departing From</th>
            <th>Airport Code</th>
            <th>Airport Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
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
              <td>{item.airport}</td>
              <td>{item.airport_name.replace(/_/g, " ")}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.country}</td>
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

export default PeopleOnTheGround;
