import "../App.css";

const GrantRevokePilotLicense = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>PersonID</label>
        <input type="text" />
        <label>LocationID</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Add / Revoke</button>
      </div>
    </div>
  );
};

export default GrantRevokePilotLicense;
