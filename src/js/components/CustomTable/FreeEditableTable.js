import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { questionHeading } from "../../constants";
import { getFormatedRawData, getCleanRawData, parseRawDataToInt } from "../../helper";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

const THead = ({ title, description }) => (
  <div style={{ minHeight: '180px' }}>
    <h3>{title}</h3>
    <p><i>{description}</i></p>
  </div>
);

const getTableHeader = (columnOrder) => {
  return columnOrder.map((order, key) => ({
    dataField: `q${key + 1}`,
    text: <THead
      title={questionHeading[order].title}
      description={questionHeading[order].desc}
    />,
    sort: true,
    onSort: (field, order) => {
      console.log(field, order);
    }
  }));
};

export default ({
  columnOrder,
  rowsProp,
  onDataChange,
  initialRowCount
}) => {
  const emptyRows = initialRowCount - rowsProp.length > 0 ? [...Array(initialRowCount - rowsProp.length)].map(() => [...Array(8)].map(() => '')) : [];
  const data = [...rowsProp, ...getFormatedRawData(emptyRows, rowsProp.length, columnOrder)];

  return (
    <BootstrapTable
      keyField="id"
      className="custom-table"
      data={data}
      columns={getTableHeader(columnOrder)}
      rowStyle={ {overflowY:'scroll' } }
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
    />
  );
}
