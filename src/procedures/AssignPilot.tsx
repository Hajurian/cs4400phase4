import "../App.css";

const AssignPilot = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Person ID</label>
        <input type="text" />
        <label>Flight ID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Assign</button>
      </div>
    </div>
  );
};

export default AssignPilot;
