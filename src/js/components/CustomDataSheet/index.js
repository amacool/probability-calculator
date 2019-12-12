import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./style.css";

export default function CustomDataSheet({
  columnsProp,
  rowsProp,
  className,
  onSheetChange,
  parseClipboard
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
        parsePaste={function(str) {
          const { data, isValid } = parseClipboard(str);
          for (let i = columnsProp.length; i >= 0; i--) {
            if (data.map(item => item[i]).every(item => item === '')) {
              data.forEach((item, index) => {
                data[index] = item.slice(0, -1);
              });
            }
          }
          if (data) {
            return data;
          } else {
            return [['']];
          }
        }}
      />
    </div>
  );
}
