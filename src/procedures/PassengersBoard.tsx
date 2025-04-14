import "../App.css";

const PassengersBoard = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Board</button>
      </div>
    </div>
  );
};

export default PassengersBoard;
