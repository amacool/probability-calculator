import React from "react";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import "./style.css";

const THead = ({ title, description, mean, SD, sampleSize }) => (
  <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ minHeight: '150px' }}>
      <h3>{title}</h3>
      <p><i>{description}</i></p>
    </div>
    {mean && SD && sampleSize && (
      <div style={{ fontStyle: 'italic', fontWeight: 'normal', color: '#888' }}>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>Mean: </span><span>{mean}</span></div>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>SD: </span><span>{SD}</span></div>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>n: </span><span>{sampleSize}</span></div>
      </div>
    )}
  </div>
);

export default function CustomDataSheet({
  columnsProp,
  rowsProp
}) {
  const [grid, setGrid] = React.useState(rowsProp);
  const onCellsChanged = (changes) => changes.forEach(({cell, row, col, value}) => console.log("New expression :" + value))

  return (
    <div>
      <ReactDataSheet
        data={grid}
        valueRenderer={(cell) => cell.value}
        sheetRenderer={props => (
          <table className={props.className + ' custom-data-sheet'}>
            <thead>
              <tr>
                {columnsProp}
              </tr>
            </thead>
            <tbody>
              {props.children}
            </tbody>
          </table>
        )}
        rowRenderer={props => (
          <tr>
            {props.children}
          </tr>
        )}
        valueViewer={(v) => <div>{v.value}</div>}
        onCellsChanged={changes => {
          const newGrid = [...grid];
          changes.forEach(({cell, row, col, value}) => {
            newGrid[row][col] = {...grid[row][col], value}
          });
          setGrid(newGrid);
        }}
      />
    </div>
  );
}
