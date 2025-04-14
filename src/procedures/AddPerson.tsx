import "../App.css";

const AddPerson = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <label>Person ID</label>
        <input type="text" />
        <label>First Name</label>
        <input type="text" />
        <label>Last Name</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>TaxID</label>
        <input type="text" />
        <label>LocationID</label>
        <input type="text" />
        <label>Experience</label>
        <input type="text" />
      </div>
      <div className="inputs">
        <label>Miles</label>
        <input type="text" />
        <label>Funds</label>
        <input type="text" />
      </div>

      <div className="inputs">
        <button>Add</button>
      </div>
    </div>
  );
};

export default AddPerson;
