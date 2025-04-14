import "../App.css";
const AddAirplane = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Airline ID</label>
        <input type="text" />
        <label>Tail Num</label>
        <input type="text" />
        <label>Seat Cap</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>Speed</label>
        <input type="text" />
        <label>LocationID</label>
        <input type="text" />
        <label>Plane Type</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>Maintained</label>
        <input type="text" />
        <label>Model</label>
        <input type="text" />
        <label>Neo</label>
        <input type="checkbox" />
      </div>
      <div className="inputs">
        <button>Add</button>
      </div>
    </div>
  );
};

export default AddAirplane;
