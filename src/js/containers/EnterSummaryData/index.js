import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import { summaryHeading } from "../../constants";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import calcActions from "../../redux/calc/actions";

const getTableHeader = (headings) => {
  return headings.map((heading, key) => ({
    dataField: `a${key + 1}`,
    text: heading,
    sort: false,
    onSort: (field, order) => {
      console.log(field, order);
    },
    headerStyle : (column, colIndex) => {
      if (colIndex === 1) {
        return { backgroundColor: '#8aa7d7' };
      }
    },
    style: function callback(cell, row, rowIndex, colIndex) {
      if (colIndex === 0) {
        return { backgroundColor: '#d4d4d4', border: "solid 1px #c4c4c4" };
      }
    },
    editable: function callback(cell, row, rowIndex, colIndex) {
      return colIndex !== 0;
    },
    classes: function callback(cell, row, rowIndex, colIndex) {
      return `col-${rowIndex}-${colIndex}`;
    }
  }));
};

const getRowsProp = (rows) => {
  return rows.map((item, index) => ({
    id: index,
    a1: item[0],
    a2: item[1],
    a3: item[2],
    a4: item[3],
    a5: item[4],
    a6: item[5],
    a7: item[6],
  }));
};

const getReducedRowsProp = (rows) => {
  return rows.map((item, index) => ({
    id: index,
    a1: item[0],
    a2: item[1],
  }));
};

function EnterSummaryData({ path, setPath, summaryData, updateSummaryData, clearSummaryData, setCalcMode }) {
  const [includeAttr, setIncludeAttr] = React.useState(true);

  const onDataChange = (newRow) => {
    const rowId = newRow.id;
    delete newRow.id;
    if (!Object.values(newRow).some(item => item !== '')) {
      return false;
    }
    let values = Object.values(newRow);
    let isInvalid = false;
    for (let i = 1; i < values.length; i ++) {
      const num = parseInt(values[i]);
      if (values[i] === "" || isNaN(values[i]) || num < 0 || num > 5 || (i === 1 && rowId === 0 && num < 1)) {
        values[i] = 'NaN';
        isInvalid = true;
      }
    }
    if (isInvalid) {
      alert("You have entered one or more invalid values. The values should be between 1 – 5 (or 0 – 10 for NPS).");
    }
    let newData = [...summaryData];
    if (includeAttr) {
      newData[rowId] = values;
    } else {
      newData[rowId][1] = values[1];
    }

    updateSummaryData(newData);
  };

  const onClearValues = () => {
    clearSummaryData();
  };

  return (
    <div>
      <div className="content-header">
        <div>
          <h2>Summary Data Entry</h2>
          <p>
            Enter the raw SUPR-Q mean, standard deviation, and sample size below. You can also enter these values for any attributes of interest (e.g. usability).<br/>
            The raw SUPR-Q mean should be between 1 to 5.
          </p>
        </div>
        <button
          className="btn-primary btn-switch-input"
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
          <button className="btn-primary btn-column-reorder" onClick={() => setIncludeAttr(!includeAttr)}>
            {!includeAttr ? 'Include Columns for Attributes' : 'Remove Columns for Attributes'}
          </button>
        </div>
        <div>
          <FreeEditableTable
            rowsProp={includeAttr ? getRowsProp(summaryData) : getReducedRowsProp(summaryData)}
            columnsProp={getTableHeader(includeAttr ? summaryHeading : summaryHeading.slice(0, 2))}
            onDataChange={onDataChange}
            className="editable"
          />
          <button className="btn-secondary btn-view-results"
            onClick={() => {
              setCalcMode(includeAttr ? 'summary-all' : 'summary-single');
              setPath('view-results');
            }}
          >
            View Results
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path,
  summaryData: state.Calc.summaryData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data),
      setCalcMode: (data) => calcActions.setCalcMode(data),
      updateSummaryData: (data) => calcActions.updateSummaryData(data),
      clearSummaryData: () => calcActions.clearSummaryData()
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EnterSummaryData);
