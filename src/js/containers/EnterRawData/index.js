import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import pathActions from "../../redux/path/actions";
import ExtendedTable from "../../components/CustomTable/ExtendedTable";
import { rawDataColumns } from "../../constants";
import { getFormatedRawData, getCleanRawData, parseRawDataToInt } from "../../helper";
import "./style.css";

function EnterRawData({ path, setPath, rawData, updateRawData }) {
  const [data, setData] = React.useState(getFormatedRawData(rawData));

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
        </div>
        <div>
          <ExtendedTable
            columnsProp={rawDataColumns}
            rowsProp={data}
            addable={true}
            editable={true}
            removable={true}
            sortable={true}
            draggable={true}
            paging={true}
            validType="numeric"
            onDataChange={onDataChange}
          />
          <button className="btn-secondary btn-view-results">View Results</button>
        </div>
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
