import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import calcActions from "../../redux/calc/actions";
import pathActions from "../../redux/path/actions";
import { getReorderedData, getSortedData, parseRawDataToInt } from "../../helper";
import { CustomModal } from "../../components/CustomModal";
import { questionHeading } from "../../constants";
import { getRawMeans } from "../../calculation/logic";
import CustomDataSheet from "../../components/CustomDataSheet";
import "./style.css";

// excel sheet
const SheetHead = ({ title, description, mean, SD, sampleSize, key, width }) => (
  <th key={key} style={{ border: '1px solid #c4c4c4', padding: 10, backgroundColor: '#d5e3fa', width: `${width}%`, verticalAlign: 'baseline' }}>
    <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ minHeight: '150px' }}>
        <h3 style={{ wordBreak: 'break-all', fontSize: 14 }}>{title}</h3>
        <p style={{ fontSize: '13px', fontWeight: 'normal' }}><i>{description}</i></p>
      </div>
      {mean && SD && sampleSize ? (
        <div style={{ fontStyle: 'italic', fontWeight: 'normal', color: '#888' }}>
          <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>Mean: </span><span>{mean}</span></div>
          <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>SD: </span><span>{SD}</span></div>
          <div style={{ display: 'flex' }}><span style={{ width: '50%' }}>n: </span><span>{sampleSize}</span></div>
        </div>
      ) : <div/>}
    </div>
  </th>
);

const getSheetHeader = (columnOrder, preCalcResult) => {
  return columnOrder.map((order, key) => (
    <SheetHead
      key={key}
      title={questionHeading[order].title}
      description={questionHeading[order].desc}
      mean={preCalcResult[order].mean}
      SD={preCalcResult[order].stdDev}
      sampleSize={preCalcResult[order].sampleSize}
      width={100 / columnOrder.length}
    />
  ));
};

const getSheetRowsProp = (initialRowCount, rows) => {
  const emptyRows = initialRowCount - rows.length > 0 ? [...Array(initialRowCount - rows.length)].map(() => [...Array(8)].map(() => '')) : [];
  const newRows = [...rows, ...emptyRows];
  return newRows.map(row => row.map(value => ({ value })))
};


// table
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
  const [preCalcResult, setPreCalcResult] = React.useState([...Array(8)].map(() => ''));
  const initialRowCount = 100;

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
        items.forEach((item, index) => {
          let num = parseInt(item);
          if (isNaN(item)) {
            msg += "Invalid input! Not a number!\n";
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
      return { data: validData, isValid: !msg };
    } catch (err) {
      alert(err);
      return { data: false, isValid: false };
    }
  };

  React.useEffect(() => {
    rawData.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(rawData, rawColumnOrder))));
  }, []);

  React.useEffect(function() {
    setColumnOrder(rawColumnOrder || []);
  }, [rawColumnOrder]);

  const onSheetChange = (data) => {
    let newData = [...rawData];
    let isValid = true;

    data.forEach(cell => {
      let { col, row, value } = cell;
      // validation here!
      const num = parseInt(value);
      if (isNaN(value) || (columnOrder[col] === 4 && (num < 0 || num > 10)) || (columnOrder[col] !== 4 && (num <= 0 || num > 5))) {
        value = value ? 'NaN' : "";
        isValid = false;
      }
      if (!newData[row]) {
        for (let i = newData.length; i <= row; i++) {
          newData = [...newData, [...Array(8)].map(() => '')];
        }
      }
      newData[row][col] = value;
    });

    // reduce ongoing empty rows from the last
    for (let i = newData.length - 1; i >= 0 ; i--) {
      if (newData[i].every((item) => item === "")) {
        newData.splice(i, 1);
      } else {
        break;
      }
    }
    if (!isValid) {
      toast.error("You have entered one or more invalid values. The values should be between 1 – 5 (or 0 – 10 for NPS).", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
    }
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
          <CustomDataSheet
            className={`w-${questionHeading.length}`}
            rowsProp={getSheetRowsProp(initialRowCount, rawData, columnOrder)}
            columnsProp={getSheetHeader(columnOrder, preCalcResult)}
            onSheetChange={onSheetChange}
            parseClipboard={isValidData}
          />
        </div>
        <div>
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
          cancelLabel="Cancel"
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
            if (!importData) {
              setOpenImportModal(false);
              return;
            }
            const { data, isValid } = isValidData(importData);
            if (data) {
              updateColumnOrder([0, 1, 2, 3, 4, 5, 6, 7]);
              updateRawData(data);
              data.length > 0 && setPreCalcResult(getRawMeans(parseRawDataToInt(getSortedData(data, [0, 1, 2, 3, 4, 5, 6, 7]))));
              setOpenImportModal(false);
            }
            if (!isValid) {
              toast.error("You have entered one or more invalid values. The values should be between 1 – 5 (or 0 – 10 for NPS).", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
            }
          }}
          title="Import Data"
          confirmLabel="Import"
          cancelLabel="Cancel"
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
