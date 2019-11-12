import React from "react";
import connect from "react-redux/es/connect/connect";
import { websiteHeading } from "../../constants";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import "./style.css";
import {bindActionCreators} from "redux";
import pathActions from "../../redux/path/actions";
import calcActions from "../../redux/calc/actions";

const getTableHeader = (headings) => {
  return headings.map((heading, key) => ({
    dataField: `a${key + 1}`,
    text: heading,
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
    editable: true
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
    a8: item[7],
    a9: item[8],
    a10: item[9],
  }));
};

function ViewDatabases({ websiteData, updateWebsiteData, calcResult }) {
  const percentileRank = calcResult ? calcResult.percentileRanksBA.map(item => item.mean) : [];
  const onDataChange = (newRow) => {
    const rowId = newRow.id;
    delete newRow.id;
    if (!Object.values(newRow).some(item => item !== '')) {
      return false;
    }
    let values = Object.values(newRow);
    // let isInvalid = false;
    // for (let i = 1; i < values.length; i ++) {
    //   const num = parseInt(values[i]);
    //   if (values[i] === "" || isNaN(values[i]) || num < 0 || num > 5 || (i === 1 && rowId === 0 && num < 1)) {
    //     values[i] = NaN;
    //     isInvalid = true;
    //   }
    // }
    // if (isInvalid) {
    //   alert("You have entered one or more invalid values. The values should be between 1 – 5 (or 0 – 10 for NPS).");
    // }
    let newData = [...websiteData];
    newData[rowId] = values;

    updateWebsiteData(newData);
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
        <div className="study-tab-container">
          <div className="study-tab">
            <div>Current Study</div>
            {percentileRank.map(item => <div className={`${item ? '' : 'empty'}`}>{item}</div>)}
          </div>
        </div>
        <div>
          <FreeEditableTable
            rowsProp={getRowsProp(websiteData)}
            columnsProp={getTableHeader(websiteHeading)}
            onDataChange={onDataChange}
            className={`tbl-all-websites ${websiteData.length > 20 ? "has-scroll" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  websiteData: state.Calc.websiteData,
  calcResult: state.Calc.calcResult
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWebsiteData: (data) => calcActions.updateWebsiteData(data),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewDatabases);
