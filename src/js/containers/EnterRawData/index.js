import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import pathActions from "../../redux/path/actions";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import { getFormatedRawData, getCleanRawData, getReorderedData, parseRawDataToInt } from "../../helper";
import { CustomModal } from "../../components/CustomModal";
import { questionHeading, defaultColumnOrder } from "../../constants";
import "./style.css";

function EnterRawData({ path, setPath, rawData, rawColumnOrder, updateRawData, updateColumnOrder }) {
  const [columnOrder, setColumnOrder] = React.useState(rawColumnOrder || []);
  const [columnOrderT, setColumnOrderT] = React.useState(rawColumnOrder || []);
  const [data, setData] = React.useState(getFormatedRawData(rawData || [], 0));
  const [openImportModal, setOpenImportModal] = React.useState(false);
  const [openReorderModal, setOpenReorderModal] = React.useState(false);
  const [curColumn, setCurColumn] = React.useState(0);

  console.log(rawData);

  React.useEffect(function() {
    rawData && setData(getFormatedRawData(rawData, 0));
  }, [rawData]);

  React.useEffect(function() {
    setColumnOrder(rawColumnOrder || []);
  }, [rawColumnOrder]);

  const onDataChange = (newRow) => {
    const rowId = newRow.id;
    delete newRow.id;
    let newData = [...rawData];
    newData[rowId] = Object.values(newRow);
    updateRawData(newData);
    // console.log(get)
    // updateRawData(getCleanRawData(newData));
    // setData(rows.map((item, index) => ({
    //   ...item,
    //   ...newData[index]
    // })));
  };

  const onClearValues = () => {
    setData([]);
  };

  const handleColumnReorder = (direction) => {
    let curPos = columnOrderT.findIndex(item => item === curColumn);
    let newPos = direction + curPos;
    if (newPos >= columnOrderT.length) {
      newPos = 0;
    } else if (newPos < 0) {
      newPos = columnOrderT.length - 1;
    }
    let temp = columnOrderT[curPos];
    let newColumnOrder = [...columnOrderT];
    newColumnOrder[curPos] = newColumnOrder[newPos];
    newColumnOrder[newPos] = temp;
    setColumnOrderT(newColumnOrder);
  };

  const handleCancelReorder = () => {
    setColumnOrderT(columnOrder);
    setOpenReorderModal(false);
  };

  const applyColumnReorder = () => {
    const newData = getReorderedData(rawData, columnOrder, columnOrderT);
    updateRawData(newData);
    updateColumnOrder(columnOrderT);
    setOpenReorderModal(false);
  };

  return (
    <div>
      <div className="content-header">
        <div>
          <h2>Raw Data Entry</h2>
          <p>Paste raw SUPR-Q data in the columns below for up to 5000 responses.<br/>
            Questions should be scored 1 to 5 (Strongly Disagree to Strongly Agree), except Q5: NPS should be scored 0 to 10 (Not at all Likely to Extremely Likely)
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            path === 'enter-raw' ? setPath('enter-summary') : setPath('enter-raw');
          }}
        >
          {path === 'enter-raw' ? 'Switch to Summary Data Entry' : 'Switch to Raw Data Entry'}
        </button>
      </div>
      <div className="content-body">
        <div className="btn-container">
          <button className="btn-primary btn-clear-value" onClick={onClearValues}>Clear Values</button>
          <button className="btn-primary btn-column-reorder" onClick={() => setOpenReorderModal(true)}>Reorder Columns</button>
          <button className="btn-primary btn-import-data" onClick={() => setOpenImportModal(true)}>Import Data</button>
        </div>
        <div>
          <FreeEditableTable
            columnOrder={columnOrder}
            rowsProp={data}
            onDataChange={onDataChange}
          />
          {/*<ExtendedTable*/}
            {/*columnsProp={rawDataColumns}*/}
            {/*rowsProp={data}*/}
            {/*addable={true}*/}
            {/*editable={true}*/}
            {/*removable={true}*/}
            {/*sortable={true}*/}
            {/*draggable={true}*/}
            {/*paging={true}*/}
            {/*validType="numeric"*/}
            {/*onDataChange={onDataChange}*/}
          {/*/>*/}
          <button className="btn-secondary btn-view-results">View Results</button>
        </div>

        <CustomModal
          open={openReorderModal}
          onCloseModal={handleCancelReorder}
          onConfirm={applyColumnReorder}
          title="Reorder Columns"
          confirmLabel="Close and Apply"
          cancelLabel="Close"
        >
          <div className="order-columns-container">
            <div className="order-columns-content">
              {columnOrderT.map((order, index) => (
                <div key={index} className={order === curColumn ? "selected" : ""} onClick={() => setCurColumn(order)}>
                  <span>{questionHeading[order].title}</span>
                  <span>{questionHeading[order].desc}</span>
                </div>
              ))}
            </div>
            <div className="order-btn-container">
              <button className="btn-primary" onClick={() => handleColumnReorder(-1)}>Move Up</button>
              <button className="btn-primary btn-column-move-down" onClick={() => handleColumnReorder(1)}>Move Down</button>
            </div>
          </div>
        </CustomModal>

        <CustomModal
          open={openImportModal}
          onCloseModal={() => setOpenImportModal(false)}
          onConfirm={() => {}}
          title="Import Data"
          confirmLabel="Import"
          cancelLabel="Close"
        >
          <div className="import-data-container">

          </div>
        </CustomModal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path,
  rawData: state.Calc.rawData,
  rawColumnOrder: state.Calc.rawColumnOrder
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data),
      updateRawData: (data) => calcActions.updateRawData(data),
      updateColumnOrder: (data) => calcActions.updateColumnOrder(data),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EnterRawData);
