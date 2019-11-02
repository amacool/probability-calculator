import React from "react";
import { ResultHeader } from "./ResultHeader";

export const SusEquivalents = ({ result }) => {
  const [visible, setVisible] = React.useState(true);
  console.log(result);
  return (
    <div className="result-container">
      <ResultHeader
        visible={visible}
        setVisible={setVisible}
        heading="SUS Equivalents"
      />
      {visible && (
        <div className="result-body">
          <div className="result-body-inner-wrapper">
            <table className="tg result-table">
              <tr>
                <th className="tg-cly1 cell-dark-grey"></th>
                <th className="tg-cly1 cell-dark-blue">Percentile Rank</th>
                <th className="tg-cly1 cell-light-blue">Raw Score</th>
              </tr>
              <tr>
                <td className="tg-cly1 cell-dark-blue">SUPR-Q (Overall)</td>
                <td className="tg-cly1 cell-light-grey">{result.suprQ[0]}</td>
                <td className="tg-cly1 cell-light-grey">{result.suprQ[1]}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Usability</td>
                <td className="tg-cly1 cell-light-grey">{result.usability[0]}</td>
                <td className="tg-cly1 cell-light-grey">{result.usability[1]}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">SUS Equivalent</td>
                <td className="tg-cly1">{result.susEquivalent[0]}</td>
                <td className="tg-cly1">{result.susEquivalent[1]}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
