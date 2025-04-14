import "../App.css";

const RetireFlight = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Retire</button>
      </div>
    </div>
  );
};

export default RetireFlight;
