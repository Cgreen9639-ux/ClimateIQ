
import React, { useEffect, useState } from "react";
import { normalizeClimateData } from "../services/etlService";

export default function Dashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await normalizeClimateData();
      setCases(data);
    }
    loadData();
  }, []);

  return (
    <div style={{padding:40}}>
      <h1>Open Climate Risk Cases</h1>
      <p>ETL Pipeline: Extract → Transform → Load (Normalized + Joined)</p>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>State</th>
            <th>Code</th>
            <th>Risk Score</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.state}</td>
              <td>{c.code}</td>
              <td>{c.risk}</td>
              <td>{c.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
