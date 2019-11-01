import React from "react";
import ExtendedTable from "../../components/CustomTable/ExtendedTable";
import { allWebsitesColumns } from "../../constants";
import "./style.css";

const rows = [
  {
    id: 0,
    w1: 'YouTube',
    w2: 'Amazon',
    w3: 'Hyatt',
    w4: 'YouTube',
    w5: 'Amazon',
    w6: 'Hyatt',
    w7: 'Amazon',
    w8: 'YouTube',
    w9: 'Amazon',
    w10: 'Hyatt',
  },
  {
    id: 0,
    w1: 'Amazon',
    w2: 'Amazon',
    w3: 'Hyatt',
    w4: 'YouTube',
    w5: 'Amazon',
    w6: 'Hyatt',
    w7: 'Amazon',
    w8: 'YouTube',
    w9: 'Amazon',
    w10: 'Hyatt',
  },
  {
    id: 0,
    w1: 'Hyatt',
    w2: 'Amazon',
    w3: 'Hyatt',
    w4: 'YouTube',
    w5: 'Amazon',
    w6: 'Hyatt',
    w7: 'Amazon',
    w8: 'YouTube',
    w9: 'Amazon',
    w10: 'Hyatt',
  }
];

export default function ViewDatabases() {
  const [data, setData] = React.useState(rows);

  return (
    <div>
      <div className="content-header">
        <div>
          <h2>SUPR-Q Database of All Websites</h2>
          <p>Table shows percentile ranks.</p>
        </div>
      </div>
      <div className="content-body">
        <div className="study-tab">
          <div>Current Study</div>
          <div>73.9%</div>
        </div>
        <div>
          <ExtendedTable
            columnsProp={allWebsitesColumns}
            rowsProp={data}
            addable={false}
            editable={false}
            removable={false}
            sortable={true}
            draggable={false}
            searchable={false}
            paging={true}
            onDataChange={(data) => {}}
          />
        </div>
      </div>
    </div>
  );
}
