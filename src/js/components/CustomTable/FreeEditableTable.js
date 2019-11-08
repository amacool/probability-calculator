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
              onDataChange({ ...row });
            }, 0);
            return { async: true };
          }
        })}
        rowEvents={{
          onClick: (e, row, rowIndex) => {
            setCurCell({})
          },
          onKeyDown: (e) => {
            if (e.keyCode === 13) {
              const cell = document.getElementsByClassName('col-0-1')[0];
              setTimeout(function() {
                cell.click();
              }, 500);
            }
          }
        }}
      />
    </div>
  );
}
