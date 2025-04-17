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

//PROCEDURES
app.get("/add_airplane", (req, res) => {
  const {
    ip_airlineID,
    ip_tail_num,
    ip_seat_capacity,
    ip_speed,
    ip_locationID,
    ip_plane_type,
    ip_model,
    ip_maintenanced,
    ip_neo,
  } = req.query;

  console.log(ip_maintenanced);
  const sql = `CALL add_airplane(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    ip_airlineID,
    ip_tail_num,
    parseInt(ip_seat_capacity),
    parseInt(ip_speed),
    ip_locationID,
    ip_plane_type,
    ip_maintenanced || null,
    ip_model || null,
    ip_neo == "true" ? true : false,
  ];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error adding airplane:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to add airplane" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/add_airport", (req, res) => {
  const {
    ip_airportID,
    ip_airport_name,
    ip_city,
    ip_state,
    ip_country,
    ip_locationID,
  } = req.query;

  const sql = `CALL add_airport(?, ?, ?, ?, ?, ?)`;
  const values = [
    ip_airportID,
    ip_airport_name,
    ip_city,
    ip_state,
    ip_country,
    ip_locationID,
  ];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error adding airport:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to add airport" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/add_person", (req, res) => {
  const {
    ip_personID,
    ip_first_name,
    ip_last_name,
    ip_locationID,
    ip_taxID,
    ip_experience,
    ip_miles,
    ip_funds,
  } = req.query;

  const sql = `CALL add_person(?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    ip_personID,
    ip_first_name,
    ip_last_name,
    ip_locationID,
    ip_taxID || null,
    parseInt(ip_experience) || null,
    parseInt(ip_miles) || null,
    parseInt(ip_funds) || null,
  ];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error adding person:", err);
      res.status(500).json({ success: false, message: "Failed to add person" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/grant_revoke_pilot_license", (req, res) => {
  const { ip_personID, ip_locationID } = req.query;

  const sql = `CALL grant_revoke_pilot_license(?, ?)`;
  const values = [ip_personID, ip_locationID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error in grant/revoke:", err);
      res.status(500).json({
        success: false,
        message: "Failed to grant/revoke pilot license",
      });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/offer_flight", (req, res) => {
  const {
    ip_flightID,
    ip_routeID,
    ip_support_airline,
    ip_progress,
    ip_next_time,
    ip_support_tail,
    ip_cost,
  } = req.query;

  const sql = `CALL offer_flight(?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    ip_flightID,
    ip_routeID,
    ip_support_airline,
    parseInt(ip_progress),
    ip_next_time,
    ip_support_tail,
    parseInt(ip_cost),
  ];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error offering flight:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to offer flight" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/land_flight", (req, res) => {
  const { ip_flightID } = req.query;

  const sql = `CALL flight_landing(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error landing flight:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to land flight" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/takeoff_flight", (req, res) => {
  const { ip_flightID } = req.query;

  const sql = `CALL takeoff_flight(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error during takeoff:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to takeoff flight" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});
app.get("/passengers_board", (req, res) => {
  const { ip_flightID } = req.query;

  if (!ip_flightID) {
    return res
      .status(400)
      .json({ success: false, message: "Flight ID is required" });
  }

  const sql = `CALL passengers_board(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error boarding passenger:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to board passenger" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});
app.get("/disembark_passenger", (req, res) => {
  const { ip_flightID } = req.query;

  if (!ip_flightID) {
    return res
      .status(400)
      .json({ success: false, message: "Flight ID is required" });
  }

  const sql = `CALL passengers_disembark(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error disembarking passenger:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to disembark passenger" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/assign_pilot", (req, res) => {
  const { ip_personID, ip_flightID } = req.query;

  if (!ip_personID || !ip_flightID) {
    return res.status(400).json({
      success: false,
      message: "Person ID and Flight ID are required",
    });
  }

  const sql = `CALL assign_pilot(?, ?)`;
  const values = [ip_personID, ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error assigning pilot:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to assign pilot" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/recycle_crew", (req, res) => {
  const { ip_flightID } = req.query;

  if (!ip_flightID) {
    return res
      .status(400)
      .json({ success: false, message: "Flight ID is required" });
  }

  const sql = `CALL recycle_crew(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error recycling crew:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to recycle crew" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/retire_flight", (req, res) => {
  const { ip_flightID } = req.query;

  if (!ip_flightID) {
    return res
      .status(400)
      .json({ success: false, message: "Flight ID is required" });
  }

  const sql = `CALL retire_flight(?)`;
  const values = [ip_flightID];

  connection.query(sql, values, (err, rows) => {
    if (err) {
      console.error("Error retiring flight:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to retire flight" });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

app.get("/simulation_cycle", (req, res) => {
  const sql = `CALL simulation_cycle()`;

  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error completing simulation cycle:", err);
      res
        .status(500)
        .json({
          success: false,
          message: "Failed to complete simulation cycle",
        });
    } else {
      res.json({ success: true, message: rows });
    }
  });
});

// VIEWS
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
app.get("/flight_on_ground", (req, res) => {
  connection.query(
    " select case when f.progress = 0 then air2.airportid else air1.airportid end as departing_from, count(distinct f.flightid) as num_flights, group_concat(distinct f.flightid order by f.flightid asc) as flight_list, min(f.next_time) as earliest_arrival, max(f.next_time) as latest_arrival, group_concat(distinct a.locationid order by a.locationid desc) as airplane_list from flight f join airplane a on f.support_airline = a.airlineid and f.support_tail = a.tail_num join route_path rp on f.routeid = rp.routeid join leg l on rp.legid = l.legid left join airport air1 on l.arrival = air1.airportid left join airport air2 on l.departure = air2.airportid where f.airplane_status = 'on_ground' and ( rp.sequence = f.progress or (f.progress = 0 and rp.sequence = 1) ) group by departing_from",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});
app.get("/people_in_air", (req, res) => {
  connection.query(
    "select      l.departure as departing_from,     l.arrival as arriving_at,     count(distinct a.locationID) as num_airplanes,     group_concat(distinct a.locationID order by a.locationID) as airplane_list,     group_concat(distinct f.flightid order by f.flightid) as flight_list,     min(f.next_time) as earliest_arrival,     max(f.next_time) as latest_arrival,     count(pi.personid) as num_pilots,     count(pas.personid) as num_passengers,     count(distinct pe.personid) as joint_pilots_passengers,     group_concat(distinct pe.personid order by pe.personid) as person_list from flight f join airplane a on f.support_airline = a.airlineid and f.support_tail = a.tail_num join route_path rp on f.routeid = rp.routeid join leg l on rp.legid = l.legid and rp.sequence = f.progress left join person pe on pe.locationid = a.locationid left join pilot pi on pi.personid = pe.personid and pi.commanding_flight = f.flightid left join passenger pas on pas.personid = pe.personid where f.airplane_status = 'in_flight' group by l.departure, l.arrival; ",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});
app.get("/people_on_ground", (req, res) => {
  connection.query(
    "select 	a.airportID as departing_from, 	a.locationID as airport,  	a.airport_name, 	a.city, 	a.state,     a.country,     count((select personID from pilot p where pers.personID = p.personID)) as num_pilots,     count((select personID from passenger p where pers.personID = p.personID)) as num_passengers,     count(pers.personID) as joint_pilots_passengers,     group_concat(distinct pers.personID order by pers.personId asc) as person_list from person pers join airport a on pers.locationID = a.locationID group by departing_from, airport, a.airport_name, a.city, a.state, a.country",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});
app.get("/route_summary", (req, res) => {
  connection.query(
    "select rp.routeID as route, count(distinct rp.legID) as num_legs,     group_concat(distinct l.legID order by rp.sequence asc) as leg_sequence,     (select sum(distance) from leg where legID in (select distinct legID from route_path where routeid = rp.routeid)) as route_length,     count(distinct f.flightID) as num_flights,     group_concat(distinct f.flightid order by f.flightid) as flight_list,     group_concat(distinct concat(l.departure, '->', l.arrival) order by rp.sequence) as airport_sequence     from route_path as rp     join leg l on rp.legID = l.legID     left join flight f on rp.routeID = f.routeID     group by route ;",
    (err, rows) => {
      if (err) {
        throw err;
      } else {
        res.json(rows).status(200);
      }
    }
  );
});

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

//RESET PROCEDURE
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
