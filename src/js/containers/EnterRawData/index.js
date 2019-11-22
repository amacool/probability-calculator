import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import pathActions from "../../redux/path/actions";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import { getFormatedRawData, getReorderedData, getSortedData, parseRawDataToInt } from "../../helper";
import { CustomModal } from "../../components/CustomModal";
import { questionHeading } from "../../constants";
import { getRawMeans } from "../../calculation/logic";
import "./style.css";

const THead = ({ title, description, mean, SD, sampleSize }) => (
  <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ minHeight: '150px' }}>
      <h3>{title}</h3>
      <p><i>{description}</i></p>
    </div>
    {mean && SD && sampleSize && (
      <div style={{ fontStyle: 'italic', fontWeight: 'normal', color: '#888' }}>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>Mean: </span><span>{mean}</span></div>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>SD: </span><span>{SD}</span></div>
        <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>n: </span><span>{sampleSize}</span></div>
      </div>
    )}
  </div>
);

const getTableHeader = (columnOrder, preCalcResult) => {
  return columnOrder.map((order, key) => ({
    dataField: `q${key + 1}`,
    text: <THead
      title={questionHeading[order].title}
      description={questionHeading[order].desc}
      mean={preCalcResult[order].mean}
      SD={preCalcResult[order].stdDev}
      sampleSize={preCalcResult[order].sampleSize}
    />,
    sort: false,
    headerStyle: function callback() {
      return { width: '12%' };
    },
    style: function callback() {
      return { width: '12%' };
    },
    classes: function callback(cell, row, rowIndex, colIndex) {
      return `col-${rowIndex}-${colIndex}`;
    },
  }));
};

const getRowsProp = (initialRowCount, rows, columnOrder) => {
  const emptyRows = initialRowCount - rows.length > 0 ? [...Array(initialRowCount - rows.length)].map(() => [...Array(8)].map(() => '')) : [];
  return [...rows, ...getFormatedRawData(emptyRows, rows.length, columnOrder)];
};

function EnterRawData({
  path,
  setPath,
  rawData,
  rawColumnOrder,
  updateRawData,
  updateColumnOrder,
  setCalcMode
}) {
  const [columnOrder, setColumnOrder] = React.useState(rawColumnOrder || []);
  const [columnOrderT, setColumnOrderT] = React.useState(rawColumnOrder || []);
  const [openImportModal, setOpenImportModal] = React.useState(false);
  const [openReorderModal, setOpenReorderModal] = React.useState(false);
  const [curColumn, setCurColumn] = React.useState(0);
  const [importData, setImportData] = React.useState('');
  const [preCalcResult, setPreCalcResult] = React.useState([...Array(8)].map(() => []));

  const isValidData = (data) => {
    try {
      if (data === "") {
        throw "Empty input!";
      }
      const rows = data.split('\n');
      const isSingleValue = (rows.length === 1 || (rows.length === 2 && rows[1] === '')) && rows[0].split('\t').length === 1;
      let validData = [];
      let msg = '';
      for (let i = 0; i < rows.length; i++) {
        if (rows[i] === '') {
          continue;
        }
        let items = rows[i].split('\t');
        if (items.every(item => item === '' || item.charCodeAt(0) === 13)) {
          continue;
        }
        if (!isSingleValue && items.length !== 8) {
          msg += 'Invalid Length!\n';
        }
        items.forEach((item, index) => {
          let num = parseInt(item);
          if (isNaN(item)) {
            msg += "Invalid input! Not a number!\n";
          }
          if (item === "") {
            msg += "There's an empty input!\n";
          }
          if (index === 4 && (num < 0 || num > 10)) {
            item = 'NaN';
            msg += "Invalid input for NPS!\n";
          }
          if (index !== 4 && (num <= 0 || num > 5)) {
            item = 'NaN';
            msg += "Invalid input for questions!\n";
          }
        });
        items = [...items, ...[...Array(8 - items.length)].map(() => "")];
        validData.push(items);
      }
      msg && alert(msg);
      return validData;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  const getClipboardData = (e) => {
    if (openImportModal || !window.posOnTable) {
      return;
    }
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const result = isValidData(pastedData);

    // checks if single value
    if (
      window.posOnTable &&
      result &&
      result.length === 1 &&
      result[0].every((item, index) => index === 0 || (index > 0 && item === ''))
    ) {
      let newData = [...rawData];
      if (newData[window.posOnTable.row]) {
        newData[window.posOnTable.row][window.posOnTable.col] = result[0][0];
      }
      updateRawData(newData);
    } else if (result) {
      updateColumnOrder([0, 1, 2, 3, 4, 5, 6, 7]);
      updateRawData(result);
      result.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(result, [0, 1, 2, 3, 4, 5, 6, 7]))));
    }
    e.stopPropagation();
    e.preventDefault();
  };

  React.useEffect(() => {
    rawData.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(rawData, rawColumnOrder))));
  }, []);

  React.useEffect(() => {
    window.addEventListener('paste', getClipboardData);
    return () => {
      window.removeEventListener('paste', getClipboardData);
    }
  }, [rawData, openImportModal]);

  React.useEffect(function() {
    setColumnOrder(rawColumnOrder || []);
  }, [rawColumnOrder]);

  const onDataChange = (newRow, newValue, colId) => {
    const rowId = newRow.id;
    delete newRow.id;
    if (rowId > rawData.length) {
      return false;
    }
    if (!Object.values(newRow).some(item => item !== '')) {
      return false;
    }
    let values = Object.values(newRow);
    const num = parseInt(newValue);
    if (newValue === "" || isNaN(newValue) || (columnOrder[colId] === 4 && (num < 0 || num > 10)) || (columnOrder[colId] !== 4 && (num <= 0 || num > 5))) {
      values[colId] = newValue ? 'NaN' : "";
      alert("You have entered one or more invalid values. The values should be between 1 – 5 (or 0 – 10 for NPS).");
    }
    let newData = [...rawData];
    newData[rowId] = values;
    updateRawData(newData);
    newData.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(newData, rawColumnOrder))));
  };

  const onClearValues = () => {
    updateRawData([]);
    setPreCalcResult([...Array(8)].map(() => []));
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
          className="btn-primary btn-switch-input"
          onClick={() => {
            if (path === 'enter-raw') {
              setCalcMode('summary-all');
              setPath('enter-summary');
            } else {
              setCalcMode('raw');
              setPath('enter-raw');
            }
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
            rowsProp={getRowsProp(100, getFormatedRawData(rawData, 0), columnOrder)}
            columnsProp={getTableHeader(columnOrder, preCalcResult)}
            onDataChange={onDataChange}
            className="tbl-raw-data tall has-scroll editable"
            nonEmptyRowCount={rawData.length}
          />
          <button
            className="btn-secondary btn-view-results"
            onClick={() => {
              setCalcMode('raw');
              setPath('view-results');
            }}
          >
            View Results
          </button>
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
          onConfirm={() => {
            const result = isValidData(importData);
            if (result) {
              updateColumnOrder([0, 1, 2, 3, 4, 5, 6, 7]);
              updateRawData(result);
              console.log(parseRawDataToInt(getSortedData(result, [0, 1, 2, 3, 4, 5, 6, 7])));
              result.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(result, [0, 1, 2, 3, 4, 5, 6, 7]))));
              setOpenImportModal(false);
            }
          }}
          title="Import Data"
          confirmLabel="Import"
          cancelLabel="Close"
        >
          <div className="import-data-container">
            <textarea onChange={(e) => setImportData(e.target.value)} />
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
      setCalcMode: (data) => calcActions.setCalcMode(data),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EnterRawData);
