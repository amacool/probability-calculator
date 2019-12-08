import React from "react";
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import "./style.css";

export default function CustomDataSheet({
  columnsProp,
  rowsProp,
  className,
  onSheetChange
}) {

  return (
    <div>
      <ReactDataSheet
        data={rowsProp}
        valueRenderer={(cell) => cell.value}
        sheetRenderer={props => (
          <table className={`${props.className} custom-data-sheet ${className}`}>
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
        valueViewer={(v) => <div style={{width: `${100/rowsProp[0].length}%`}}>{v.value}</div>}
        onCellsChanged={changes => {
          onSheetChange(changes);
        }}
      />
    </div>
  );
}
