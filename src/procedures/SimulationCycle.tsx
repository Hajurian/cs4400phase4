import "../App.css";

const SimulationCycle = () => {
  async function handleClick() {
    const res = await fetch("http://localhost:5000/simulation_cycle");
    const data = await res.json();
    if (data.success) {
      alert("Next step completed successfully");
    } else {
      alert("Failed to complete next step");
    }
    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="inputs">
        <button onClick={handleClick}>Next Step</button>
      </div>
    </div>
  );
};

export default SimulationCycle;
