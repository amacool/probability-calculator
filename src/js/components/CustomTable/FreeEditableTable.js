import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const products = [ 'abc', 'def', 'efe' ];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />