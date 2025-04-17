import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

//mysql connection
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "flight_tracking",
  port: 3306,
});
//connection success?
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

//express connection
const port = 5000;
app.listen(port);
app.use(cors({ origin: "http://localhost:5173" })); //allow cors to localhost

app.get("/flight_in_air", (req, res) => {
  connection.query(
    "select l.departure as departing_from,l.arrival as arriving_at,count(distinct f.flightID) as num_flights,group_concat(distinct f.flightID order by f.flightID asc) as flight_list,MIN(f.next_time) AS earliest_arrival,MAX(f.next_time) AS latest_arrival,GROUP_CONCAT(DISTINCT a.locationID ORDER BY a.locationID desc) AS airplane_list from flight f join route_path r ON f.routeID = r.routeID and f.progress = r.sequence join leg l ON r.legID = l.legID join airplane a ON f.support_airline = a.airlineID and f.support_tail = a.tail_num where f.airplane_status = 'in_flight' group by l.departure, l.arrival;",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});

//alternative airport
app.get("/alternative_airports", (req, res) => {
  connection.query(
    "select a.city, a.state, a.country, count(*) as num_airports,group_concat(a.airportID order by a.airportID) as airport_code_list,group_concat(a.airport_name order by a.airportID) as airport_name_list from airport a group by a.city, a.state, a.country having num_airports > 1",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});

app.get("/reset", (req, res) => {
  connection.query("CALL magic44_reset_database_state()", (err, rows) => {
    if (err) {
      throw err;
    } else {
      res.json({ message: "Successfully reset database" }).status(200);
    }
  });
});

console.log("app is listening on port ", port);

export default connection;
