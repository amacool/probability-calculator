import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

export default ({
  columnsProp,
  rowsProp,
  onDataChange,
  editable,
  className
}) => {
  const [curCell, setCurCell] = React.useState({ row: 0, col: 0 });
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
              done();
              onDataChange({ ...row }, newValue, parseInt(column.dataField.substr(1)) - 1);
              const rowIndex = row.id;
              const colIndex = parseInt(column.dataField.substr(1)) - 1;
              setCurCell({ row: rowIndex, col: colIndex });
            }, 0);
            return { async: true };
          }
        })}
        rowEvents={{
          onClick: (e) => {
            let className = e.target.className;
            className = className.replace('col-', '');
            const row = className.split('-')[0];
            const col = className.split('-')[1];
            setCurCell({ row, col });
          },
          onKeyDown: (e) => {
            if (e.keyCode === 13) {
              let row = curCell.row;
              let col = curCell.col;
              col ++;
              if (col >= columnsProp.length) {
                row ++;
                col = 0;
              }
              const cell = document.getElementsByClassName(`col-${row}-${col}`)[0];
              setTimeout(function() {
                cell.click();
                setCurCell({ row, col });
              }, 0);
            }
          }
        }}
      />
    </div>
  );
}
