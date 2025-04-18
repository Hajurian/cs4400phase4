import "../App.css";

const SimulationCycle = () => {
  async function handleClick() {
    const res = await fetch("http://localhost:5000/simulation_cycle");
    const data = await res.json();
    alert(data.message);
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
