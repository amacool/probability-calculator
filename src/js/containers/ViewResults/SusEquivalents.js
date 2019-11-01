import React from "react";
import { ResultHeader } from "./ResultHeader";

export const SusEquivalents = () => {
  const [visible, setVisible] = React.useState(true);
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
                <td className="tg-cly1 cell-light-grey">73.9%</td>
                <td className="tg-cly1 cell-light-grey">4.13</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Usability</td>
                <td className="tg-cly1 cell-light-grey">73.9%</td>
                <td className="tg-cly1 cell-light-grey">4.13</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">SUS Equivalent</td>
                <td className="tg-cly1">73.9%</td>
                <td className="tg-cly1">4.13</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
