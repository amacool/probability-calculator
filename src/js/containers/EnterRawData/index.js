import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import pathActions from "../../redux/path/actions";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import { getFormatedRawData, getCleanRawData, parseRawDataToInt } from "../../helper";
import { CustomModal } from "../../components/CustomModal";
import { questionDesc, questionHeading } from "../../constants";
import "./style.css";

function EnterRawData({ path, setPath, rawData, updateRawData }) {
  const [data, setData] = React.useState(getFormatedRawData(rawData, 0));
  const [openImportModal, setOpenImportModal] = React.useState(false);
  const [curColumn, setCurColumn] = React.useState(0);

  const onDataChange = (newData) => {
    updateRawData(getCleanRawData(newData));
    // setData(rows.map((item, index) => ({
    //   ...item,
    //   ...newData[index]
    // })));
  };

  const onClearValues = () => {
    setData([]);
  };

  const handleColumnReorder = (direction) => {

  };

  const applyColumnReorder = () => {

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
          <button className="btn-primary btn-column-reorder">Reorder Columns</button>
          <button className="btn-primary btn-import-data" onClick={() => setOpenImportModal(true)}>Import Data</button>
        </div>
        <div>
          <FreeEditableTable
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
          open={openImportModal}
          onCloseModal={() => setOpenImportModal(false)}
          onConfirm={() => applyColumnReorder()}
          title="Reorder Columns"
        >
          <div className="order-columns-container">
            <div className="order-columns-content">
              {questionHeading.map((item, index) => (
                <div key={index} className={index === curColumn ? "selected" : ""} onClick={() => setCurColumn(index)}>
                  <span>{item}</span>
                  <span>{questionDesc[index]}</span>
                </div>
              ))}
            </div>
            <div className="order-btn-container">
              <button className="btn-primary" onClick={() => handleColumnReorder(0)}>Move Up</button>
              <button className="btn-primary btn-column-move-down" onClick={() => handleColumnReorder(1)}>Move Down</button>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path,
  rawData: state.Calc.rawData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data),
      updateRawData: (data) => calcActions.updateRawData(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EnterRawData);
