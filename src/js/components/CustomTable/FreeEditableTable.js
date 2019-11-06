import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';

const products = [
  { id: 1, name: "Item 1", price: 100 },
  { id: 2, name: "Item 2", price: 102 }
];
const columns = [{
  dataField: 'id',
  text: <p>Product ID</p>
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default ({
  columnsProp,
  rowsProp,
  onDataChange
}) => {
  console.log(columnsProp, rowsProp);
  return (
    <BootstrapTable
      keyField='id'
      data={rowsProp}
      columns={columnsProp}
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        beforeSaveCell(oldValue, newValue, row, column, done) {
          setTimeout(() => {
            if (window.confirm('Do you want to accep this change?')) {
              done(); // contine to save the changes
            } else {
              done(false); // reject the changes
            }
          }, 0);
          return { async: true };
        }
      })}
    />
  );
}
