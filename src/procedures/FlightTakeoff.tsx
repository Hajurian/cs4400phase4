import "../App.css";

const FlightTakeoff = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Takeoff</button>
      </div>
    </div>
  );
};

export default FlightTakeoff;
