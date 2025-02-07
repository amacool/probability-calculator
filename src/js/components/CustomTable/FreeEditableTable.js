import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

let curCell = { row: 0, col: 0 };

export default ({
  columnsProp,
  rowsProp,
  onDataChange,
  editable,
  className,
  nonEmptyRowCount
}) => {
  const navigateToCell = (row, col, keyCode) => {
    keyCode !== 13 && document.getElementsByClassName('react-bootstrap-table-editing-cell')[0].children[0].blur();
    const cell = document.getElementsByClassName(`col-${row}-${col}`)[0];
    setTimeout(function () {
      cell && cell.click();
      window.posOnTable = { row, col };
    }, 0);
  };

  const getCellPos = (className) => {
    const nameArr = className.split(' ');
    const posName = nameArr.find(item => item.indexOf('col-') >= 0);
    if (!posName) {
      return null;
    }
    let replaced = posName.replace('col-', '');
    const row = parseInt(replaced.split('-')[0]);
    const col = parseInt(replaced.split('-')[1]);
    return { row, col };
  };

  return (
    <div className={`custom-table-container ${className}`}>
      <BootstrapTable
        keyField="id"
        data={rowsProp}
        columns={columnsProp}
        cellEdit={ cellEditFactory({
          mode: 'click',
          blurToSave: true,
          autoSelectText: true,
          beforeSaveCell(oldValue, newValue, row, column, done) {
            setTimeout(() => {
              const rowIndex = row.id;
              const colIndex = parseInt(column.dataField.substr(1)) - 1;
              if (rowIndex <= nonEmptyRowCount) {
                done();
                oldValue !== newValue && onDataChange({...row}, newValue, parseInt(column.dataField.substr(1)) - 1);
                curCell = { row: rowIndex, col: colIndex };
                window.posOnTable = null;
              } else {
                done(false);
              }
            }, 0);
            return { async: true };
          }
        })}
        rowEvents={{
          onClick: function(e) {
            let className = e.target.className;
            curCell = getCellPos(className);
            window.posOnTable = curCell;
          },
          onKeyDown: function(e) {
            let row = curCell.row;
            let col = curCell.col;
            if (e.keyCode === 13) {
              col ++;
              if (col >= columnsProp.length) {
                row ++;
                col = 0;
              }
              navigateToCell(row, col, e.keyCode);
            } else if (e.keyCode === 37) {
              col --;
              if (col < 0) {
                col = columnsProp.length - 1;
                if (row > 0) {
                  row --;
                } else {
                  return;
                }
              }
              navigateToCell(row, col);
            } else if (e.keyCode === 39) {
              col ++;
              if (col >= columnsProp.length) {
                col = 0;
                row ++;
              }
              navigateToCell(row, col);
            } else if (e.keyCode === 38) {
              e.stopPropagation();
              row --;
              if (row < 0) {
                return;
              }
              navigateToCell(row, col);
            } else if (e.keyCode === 40) {
              e.stopPropagation();
              row ++;
              if (row > rowsProp.length) {
                return;
              }
              navigateToCell(row, col);
            }
          }
        }}
      />
    </div>
  );
}
