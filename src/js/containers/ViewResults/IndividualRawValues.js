import React from "react";
import { ResultHeader } from "./ResultHeader";
import { summaryHeading } from "../../constants";
import FreeEditableTable from "../../components/CustomTable/FreeEditableTable";
import { exportTable } from "../../helper";

const getFormatedRawData = (data, start) => {
  return data.map((item, index) => ({
    id: start + index,
    q1: item[0],
    q2: item[1],
    q3: item[2],
    q4: item[3],
    q5: item[4],
  }));
};

const getTableHeader = (headings) => {
  return headings.slice(1).map((heading, key) => ({
    dataField: `q${key + 1}`,
    text: heading,
    sort: false,
    headerStyle : (column, colIndex) => {
      if (colIndex === 0) {
        return { backgroundColor: '#8aa7d7', width: '12%' };
      }
    },
    style: function callback() {
      return { width: '12%' };
    },
    editable: false,
    classes: function callback(cell, row, rowIndex, colIndex) {
      return `col-${rowIndex}-${colIndex}`;
    }
  }));
};

const getRowsProp = (initialRowCount, rows) => {
  const emptyRows = initialRowCount - rows.length > 0 ? [...Array(initialRowCount - rows.length)].map(() => [...Array(8)].map(() => '')) : [];
  return [...rows, ...getFormatedRawData(emptyRows, rows.length)];
};

export const IndividualRawValues = ({ result }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="result-container">
      <ResultHeader
        visible={visible}
        setVisible={setVisible}
        heading="Individual Raw Values by Attribute"
      />
      {visible && (
        <div className="result-body">
          <div className="result-body-inner-wrapper individual-raw-values-inner">
            <FreeEditableTable
              rowsProp={getRowsProp(100, getFormatedRawData(result))}
              columnsProp={getTableHeader(summaryHeading)}
              className="short tbl-individual-raw-values has-scroll"
            />
            <div className="export-btn-container">
              <button className="btn-primary btn-clear-value" onClick={() => exportTable([summaryHeading.slice(1), ...result], "raw-values.csv")}>Export Table</button>
            </div>
          </div>
          <div className="">Rows correspond to order entered under Raw Data Entry</div>
        </div>
      )}
    </div>
  );
};
