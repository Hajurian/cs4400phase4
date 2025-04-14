import "../App.css";

const PassengersDisembark = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Disembark</button>
      </div>
    </div>
  );
};
export default PassengersDisembark;
