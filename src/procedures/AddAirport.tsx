import "../App.css";

const AddAirport = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Airport ID</label>
        <input type="text" />
        <label>Airport Name</label>
        <input type="text" />
        <label>City</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>State</label>
        <input type="text" />
        <label>Country</label>
        <input type="text" />
        <label>Location ID</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <button>Add</button>
      </div>
    </div>
  );
};

export default AddAirport;
