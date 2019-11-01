import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import ExtendedTable from "../../components/CustomTable/ExtendedTable";
import { summaryDataColumns } from "../../constants";

const rows = [
  {
    id: 0,
    s0: 'Raw Score (Mean)',
    s1: '1',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
  },
  {
    id: 1,
    s0: 'Standard Deviation',
    s1: '2',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
  },
  {
    id: 2,
    s0: 'Sample Size',
    s1: '3',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
  },
];

function EnterSummaryData({ path, setPath }) {
  const [includeAttr, setIncludeAttr] = React.useState(false);
  const [data, setData] = React.useState(rows);

  const getReducedData = () => {
    return data.map((item) => ({ id: item.id, s0: item.s0, s1: item.s1 }));
  }

  const onDataChange = (newData) => {
    console.log('enter summary:', newData);
    // setData(rows.map((item, index) => ({
    //   ...item,
    //   ...newData[index]
    // })));
  };

  const onClearValues = () => {
    setData(rows.map((item) => ({
      ...item,
      s1: '',
      s2: '',
      s3: '',
      s4: '',
      s5: ''
    })));
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
          <button className="btn-primary btn-column-reorder" onClick={() => setIncludeAttr(!includeAttr)}>
            {!includeAttr ? 'Include Columns for Attributes' : 'Remove Columns for Attributes'}
          </button>
        </div>
        <div>
          <ExtendedTable
            columnsProp={includeAttr ? summaryDataColumns : summaryDataColumns.slice(0, 2)}
            rowsProp={includeAttr ? data : getReducedData()}
            addable={false}
            editable={true}
            removable={false}
            sortable={false}
            draggable={false}
            searchable={false}
            paging={false}
            onDataChange={onDataChange}
            validType="number"
          />
          <button className="btn-secondary btn-view-results">View Results</button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EnterSummaryData);
