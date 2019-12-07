import React from "react";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import "./style.css";

export default function CustomDataSheet({
  columnsProp,
  rowsProp
}) {
  const [grid, setGrid] = React.useState(rowsProp);

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
        valueViewer={(v) => <div style={{width: `${100/grid[0].length}%`}}>{v.value}</div>}
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
