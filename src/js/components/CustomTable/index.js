import React from "react";
import "./style.css";

export default function CustomTable({ columns, data }) {
  return (
    <table className="custom-table">
      <thead>
        <tr>{columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.map((item, index) => <td key={index}>{item}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
