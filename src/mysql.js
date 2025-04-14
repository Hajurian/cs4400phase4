import mysql from "mysql2";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flight_tracking",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("CONNECTION SUCCESSFUL!");
  }
});
