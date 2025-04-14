import "../App.css";

const RecycleCrew = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>FlightID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Recycle</button>
      </div>
    </div>
  );
};

export default RecycleCrew;
