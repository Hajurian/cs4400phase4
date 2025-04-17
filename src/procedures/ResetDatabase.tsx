async function handleClick() {
  const res = await fetch("http://localhost:5000/reset");
  const data = await res.json();
  alert(data.message);
}
const ResetDatabase = () => {
  return (
    <div className="wrapper">
      <div className="inputs">
        <button onClick={handleClick}>Reset</button>
      </div>
    </div>
  );
};

export default ResetDatabase;
