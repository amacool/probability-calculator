import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import { websiteHeading } from "../../constants";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import pathActions from "../../redux/path/actions";
import { CustomModal } from "../../components/CustomModal";
import calcActions from "../../redux/calc/actions";
import { exportTable, isValidDate } from "../../helper";
import { SortAsc, SortDesc } from "../../components/Icons";
import "./style.css";

const getTableHeader = (headings, editable, setSortBy, sortBy, isAsc) => {
  return headings.map((heading, key) => ({
    dataField: `a${key + 1}`,
    text: <div onClick={() => setSortBy(key)} style={{ pointerEvents: 'all', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ marginRight: 3 }}>{heading}</span>
      {sortBy === key && (!isAsc ? <SortAsc width={15}/> : <SortDesc width={15}/>)}
    </div>,
    sort: true,
    onSort: (field, order) => {
      console.log(field, order);
    },
    headerStyle : (column, colIndex) => {
      let style = { width: '10%', maxWidth: '10%', fontSize: '14px' };
      if (colIndex === 4) {
        style.backgroundColor = '#8aa7d7';
      } else if (colIndex > 4 && colIndex < 9) {
        style.backgroundColor = '#d5e3fa';
      } else {
        style.backgroundColor = '#d4d4d4';
      }
      return style;
    },
    style: function callback() {
      return {
        width: '10%',
        maxWidth: '10%',
        fontSize: '14px',
        fontWeight: '600',
        padding: '2px 10px'
      };
    },
    classes: function callback(cell, row, rowIndex, colIndex) {
      return `col-${rowIndex}-${colIndex}`;
    },
    editable
  }));
};

const getRowsProp = (rows) => {
  let data = rows.length > 0 ? rows : [['', '', '', '', '', '', '', '', '', '']];
  return data.map((item, index) => ({
    id: index,
    a1: item[0],
    a2: item[1],
    a3: item[2],
    a4: item[3],
    a5: item[4],
    a6: item[5],
    a7: item[6],
    a8: item[7],
    a9: item[8],
    a10: item[9],
  }));
};

function ViewDatabases({ websiteData, updateWebsiteData, calcResult, isAuthenticated, setPath }) {
  const [openImportModal, setOpenImportModal] = React.useState(false);
  const [importData, setImportData] = React.useState('');
  const [sortBy, setSortBy] = React.useState(-1);
  const [isAsc, setIsAsc] = React.useState(null);

  let percentileRank = calcResult && calcResult.percentileRanksBA ? calcResult.percentileRanksBA.map(item => item.mean) : [];
  // if (percentileRank !== [] && calcResult !== null && calcResult.rawScoresBA) {
  //   percentileRank[5] = calcResult.rawScoresBA[5].mean * 100 + '%';
  // }

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
          let x = parseFloat(item.substr(0, item.length - 1));
          let proSign = item.substr(item.length - 1, 1) === '%';
          if (
            (index >= 4 && (!proSign || isNaN(x) || x < 0 || x > 100)) ||
            (index === 1 && !isValidDate(item))
          ) {
            msg = "You have entered one or more invalid values.\n";
          }
        });
        items = [...items, ...[...Array(10 - items.length)].map(() => "")];
        validData.push(items);
      }
      msg && toast.error(msg, {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
      return validData;
    } catch (err) {
      alert(err);
      return false;
    }
  };

  const onDataChange = (newRow, newValue, colId) => {
    const rowId = newRow.id;
    delete newRow.id;
    if (!Object.values(newRow).some(item => item !== '')) {
      return false;
    }
    let values = Object.values(newRow);
    let x = parseFloat(newValue.substr(0, newValue.length - 1));
    let proSign = newValue.substr(newValue.length - 1, 1) === '%';
    if (
      (colId >= 4 && (!proSign || isNaN(x) || x < 0 || x > 100)) ||
      (colId === 1 && !isValidDate(newValue))
    ) {
      toast.error("You have entered one or more invalid values.", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
    }

    let newData = [...websiteData];
    newData[rowId] = values;

    updateWebsiteData(newData);
  };

  const handleSortBy = (newSortBy) => {
    if (newSortBy === sortBy) {
      setIsAsc(val => !val);
    } else {
      setIsAsc(false);
    }
    setSortBy(newSortBy);
  };

  return (
    <div>
      <div className="content-header">
        <div>
          <h2>SUPR-Q Database of All Websites</h2>
          <p>Table shows percentile ranks.</p>
        </div>
      </div>
      <div className="content-body">
        {isAuthenticated === 1 && (
          <div className="export-websites-container">
            <p>You can import data by copying & paste into table or modal and export data as .csv file or as calculation static parameters.</p>
            <button className="btn-primary" onClick={() => setOpenImportModal(true)}>Import Data</button>
            <button className="btn-secondary" onClick={() => exportTable([websiteHeading, ...websiteData], "website-data.csv")}>Export As CSV</button>
            <button className="btn-secondary" onClick={() => setPath('manage-supr')}>Export As Calc Params</button>
          </div>
        )}
        <div className="study-tab-container">
          <div className="study-tab">
            <div>Current Study</div>
            {percentileRank.map(item => <div className={`${item ? '' : 'empty'}`}>{item}</div>)}
          </div>
        </div>
        <div>
          <FreeEditableTable
            rowsProp={getRowsProp(websiteData)}
            columnsProp={getTableHeader(websiteHeading, isAuthenticated === 1, handleSortBy, sortBy, isAsc)}
            onDataChange={onDataChange}
            className={`tbl-all-websites ${websiteData.length > 20 ? "has-scroll" : ""}`}
            nonEmptyRowCount={websiteData.length}
          />
        </div>
      </div>
      <CustomModal
        open={openImportModal}
        onCloseModal={() => setOpenImportModal(false)}
        onConfirm={() => {
          const result = isValidData(importData);
          updateWebsiteData(result);
          setOpenImportModal(false);
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
  );
}

const mapStateToProps = (state) => ({
  websiteData: state.Calc.websiteData,
  calcResult: state.Calc.calcResult,
  isAuthenticated: state.Calc.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWebsiteData: (data) => calcActions.updateWebsiteData(data),
      setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewDatabases);
