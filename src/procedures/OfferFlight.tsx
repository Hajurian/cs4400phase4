import "../App.css";

const OfferFlight = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Flight ID</label>
        <input type="text" />
        <label>Route ID</label>
        <input type="text" />
        <label>Support Airline</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>Progress</label>
        <input type="text" />
        <label>Next Time</label>
        <input type="text" />
        <label>Support Tail</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>Cost</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Add</button>
      </div>
    </div>
  );
};

export default OfferFlight;
