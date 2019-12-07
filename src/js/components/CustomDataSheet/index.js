import React from "react";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import "./style.css";

export default function CustomDataSheet() {
  const [grid, setGrid] = React.useState(
    [
      [{value:  5, expr: '1 + 4'}, {value:  6, expr: '6'}, {value:  6, expr: '6'}],
      [{value:  5, expr: '1 + 4'}, {value:  5, expr: '1 + 4'}, {value:  6, expr: '6'}]
    ]
  );
  const columns = ['first', 'second', 'third'];
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
                {columns.map((col, index) => (
                  <th key={index}>
                    {col}
                  </th>
                ))}
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
      />
    </div>
  );
}
