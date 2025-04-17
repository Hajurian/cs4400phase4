import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "flight_tracking",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

// connection.query(
//   "select a.city, a.state, a.country, count(*) as num_airports,group_concat(a.airportID order by a.airportID) as airport_code_list,group_concat(a.airport_name order by a.airportID) as airport_name_list from airport a group by a.city, a.state, a.country having num_airports > 1",
//   (err, rows) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(rows);
//     }
//   }
// );

const port = 5000;
app.listen(port);
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

console.log("app is listening on port ", port);

export default connection;
