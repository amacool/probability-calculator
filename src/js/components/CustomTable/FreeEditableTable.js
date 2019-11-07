import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

export default ({
  columnsProp,
  rowsProp,
  onDataChange,
  scroll
}) => {
  return (
    <div className={`custom-table-container ${scroll ? 'has-scroll' : ''}`}>
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
            // console.log(row, rowIndex);
          },
          onKeyDown: (e) => {
            // console.log(e.keyCode);
          }
        }}
      />
    </div>
  );
}
