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
  const [innerRows, setInnerRows] = React.useState(rowsProp);
  const [isSelecting, setIsSelecting] = React.useState(false);
  const beginOfSelection = React.useRef(null);
  const endOfSelection = React.useRef(null);

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

  const actionOnSelectedCells = (action) => {
    if (!beginOfSelection.current || !endOfSelection.current) {
      return;
    }
    let row1 = Math.min(beginOfSelection.current.row, endOfSelection.current.row);
    let row2 = Math.max(beginOfSelection.current.row, endOfSelection.current.row);
    let col1 = Math.min(beginOfSelection.current.col, endOfSelection.current.col);
    let col2 = Math.max(beginOfSelection.current.col, endOfSelection.current.col);
    for (let i = row1; i <= row2; i++) {
      for (let j = col1; j <= col2; j++) {
        const cell = document.getElementsByClassName(`col-${i}-${j}`)[0];
        if (cell && action === 'deselect') {
          cell.className = cell.className.replace('cell-active', '');
          cell.className = cell.className.replace('cell-selected', '');
        }
      }
    }
  };

  const cleanSelectedCells = () => {
    actionOnSelectedCells('deselect');
  };

  const isRightSelection = ele => {
    return ele.tagName === 'TD';
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
          },
          onMouseDown: function(e) {
            cleanSelectedCells();
            if (!isRightSelection(e.target)) {
              return;
            }
            setIsSelecting(true);
            let className = e.target.className;
            if (className.indexOf('cell-active') < 0) {
              className += ' cell-active';
              e.target.className = className;
            }
            beginOfSelection.current = getCellPos(className);
          },
          onMouseMove: function(e) {
            cleanSelectedCells();
            if (!isSelecting || !isRightSelection(e.target)) {
              return;
            }
            let className = e.target.className;
            if (className.indexOf('cell-selected') < 0) {
              className += ' cell-selected';
              e.target.className = className;
            }
            endOfSelection.current = getCellPos(className);
          },
          onMouseUp: function(e) {
            setIsSelecting(false);
            if (!isRightSelection(e.target)) {
              return;
            }
            let className = e.target.className;
            endOfSelection.current = getCellPos(className);
          },
        }}
      />
    </div>
  );
}
