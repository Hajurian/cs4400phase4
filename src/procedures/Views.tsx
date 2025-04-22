import { useEffect, useState } from "react";

const validTables = [
  "airline",
  "airplane",
  "airport",
  "flight",
  "leg",
  "location",
  "passenger",
  "passenger_vacations",
  "person",
  "pilot",
  "pilot_licenses",
  "route",
  "route_path",
];

const Views = () => {
  const [selectedView, setSelectedView] = useState(validTables[0]);
  const [viewData, setViewData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/?table=${selectedView}`);
        const data = await res.json();
        setViewData(data.rows);
        if (data.rows.length > 0) {
          setColumns(Object.keys(data.rows[0])); //very smart solution
        } else {
          setColumns([]);
        }
      } catch (err) {
        console.error("Failed to fetch view data:", err);
        setViewData([]);
        setColumns([]);
      }
    };

    fetchViewData();
  }, [selectedView]);

  return (
    <div className="table-container">
      <h2 className="table-title">Database Views</h2>

      <div className="inputs">
        <label htmlFor="view-select">Choose a table/view:</label>
        <select
          id="view-select"
          value={selectedView}
          onChange={(e) => setSelectedView(e.target.value)}
        >
          {validTables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>

      <table className="airport-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {viewData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Views;
