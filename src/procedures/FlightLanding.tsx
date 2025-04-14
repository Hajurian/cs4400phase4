import "../App.css";
const FlightLanding = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Land</button>
      </div>
    </div>
  );
};

export default FlightLanding;
