import React, { forwardRef } from 'react';
import MaterialTable, { MTableEditField } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo({
  columnsProp,
  rowsProp,
  onDataChange,
  addable,
  editable,
  removable,
  sortable,
  draggable,
  searchable,
  paging,
  validType
}) {
  const [state, setState] = React.useState({
    columns: columnsProp,
    data: rowsProp,
  });

  React.useEffect(() => {
    console.log(state.data);
    onDataChange(state.data);
  }, [state.data]);

  React.useEffect(() => {
    setState({
      columns: columnsProp,
      data: rowsProp,
    });
  }, [columnsProp, rowsProp]);

  const isObjectEqual = (a, b) => {
    const keys = Object.keys(a);
    return !keys.some((key) => a[key] !== b[key]);
  };

  const isValidData = (data) => {
    const values = Object.values(data);
    const keys = Object.keys(data);
    if (validType === 'numeric') {
      return !values.some((item) => {
        if (item && !(/^\d+$/.test(item))) {
          return true;
        } else {
          return false;
        }
      });
    } else if (validType === 'number') {
      return !values.some((item, index) => {
        if (item && keys[index] !== 's0' && isNaN(item)) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return true;
    }
  };

  return (
    <MaterialTable
      icons={tableIcons}
      title=""
      columns={state.columns}
      data={state.data}
      onCellClick={() => alert('ff')}
      options={{
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: '#d5e3fa',
          color: '#323232',
          fontWeight: 'bold'
        },
        sorting: sortable,
        draggable,
        search: searchable,
        paging
      }}
      components={{
        EditField: props => {
          const { columnDef } = props;
          return (
            <MTableEditField {...props} columnDef={{ ...columnDef, title: columnDef.heading ? columnDef.heading : columnDef.title }} />
          );
        }
      }}
      editable={{
        onRowAdd: addable ? newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (!validType || isValidData(newData)) {
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
              } else {
                alert('invalid input');
              }
            }, 600);
          }) : null,
        onRowUpdate: editable ? (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (!validType || isValidData(newData)) {
                const data = [...state.data];
                const tempData = { ...oldData };
                delete tempData.tableData;
                if (!isObjectEqual(tempData, newData)) {
                  data[oldData.id] = newData;
                  setState({ ...state, data });
                }
              } else {
                alert('invalid input');
              }
            }, 600);
          }) : null,
        onRowDelete: removable ? oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(oldData.id, 1);
              setState({ ...state, data });
            }, 600);
          }) : null,
      }}
    />
  );
}
