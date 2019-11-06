import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { questionDesc, questionHeading } from "../../constants";
import { getFormatedRawData, getCleanRawData, parseRawDataToInt } from "../../helper";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './style.css';

const THead = ({ title, description }) => (
  <div style={{ minHeight: '180px' }}>
    <h3>{title}</h3>
    <span><i>{description}</i></span>
  </div>
);

const getTableHeader = () => {
  return questionDesc.map((item, key) => ({
      dataField: `q${key + 1}`,
      text: <THead
        title={questionHeading[key]}
        description={questionDesc[key]}
      />,
      sort: true,
      onSort: (field, order) => {
        console.log(field, order);
      }
    })
  );
};

export default ({
  rowsProp,
  onDataChange
}) => {
  const emptyRows = 100 - rowsProp.length > 0 ? [...Array(100 - rowsProp.length)].map(() => [...Array(8)].map(() => '')) : [];
  const data = [...rowsProp, ...getFormatedRawData(emptyRows, rowsProp.length)];
  console.log(data);
  return (
    <BootstrapTable
      keyField="id"
      className="custom-table"
      data={data}
      columns={getTableHeader()}
      rowStyle={ {overflowY:'scroll' } }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        autoSelectText: true,
        beforeSaveCell(oldValue, newValue, row, column, done) {
          setTimeout(() => {
            done();
          }, 0);
          return { async: true };
        }
      })}
    />
  );
}
