import React from "react";
import { ResultHeader } from "./ResultHeader";

export const OverallSupr = ({ result }) => {
  const [visible, setVisible] = React.useState(true);
  return (
    <div className="result-container">
      <ResultHeader
        visible={visible}
        setVisible={setVisible}
        heading="Overall SUPR-Q Results"
      />
      {visible && (
        <div className="result-body">
          <div className="result-body-inner-wrapper mb-50">
            <table className="tg result-table">
              <tbody>
                <tr>
                  <th className="tg-cly1 cell-dark-blue fs-14" colSpan="2">SUPR-Q Percentile Rank</th>
                  <th className="tg-0lax cell-white fs-22">{result.percentileRank.percentileRank}</th>
                </tr>
                <tr>
                  <td className="tg-cly1 cell-dark-grey" rowSpan="2">Confidence Interval</td>
                  <td className="tg-cly1 cell-dark-grey">Low</td>
                  <td className="tg-0lax cell-light-grey">{result.percentileRank.ciLow}</td>
                </tr>
                <tr>
                  <td className="tg-cly1 cell-dark-grey">High</td>
                  <td className="tg-0lax cell-light-grey">{result.percentileRank.ciHigh}</td>
                </tr>
                <tr>
                  <td className="tg-0lax cell-dark-grey" colSpan="2">Margin of Error</td>
                  <td className="tg-0lax cell-light-grey">{result.percentileRank.marginOfError}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="result-body-inner-wrapper">
            <table className="tg result-table">
              <tbody>
                <tr>
                  <th className="tg-cly1 cell-light-blue fs-14" colSpan="2">SUPR-Q Raw Score</th>
                  <th className="tg-0lax cell-white fs-22">{result.rawScore.rawScore}</th>
                </tr>
                <tr>
                  <td className="tg-cly1 cell-dark-grey" rowSpan="2">Confidence Interval</td>
                  <td className="tg-cly1 cell-dark-grey">Low</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.ciLow}</td>
                </tr>
                <tr>
                  <td className="tg-cly1 cell-dark-grey">High</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.ciHigh}</td>
                </tr>
                <tr>
                  <td className="tg-0lax cell-dark-grey" colSpan="2">Standard Deviation</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.stdDev}</td>
                </tr>
                <tr>
                  <td className="tg-0lax cell-dark-grey" colSpan="2">Sample Size</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.sampleSize}</td>
                </tr>
                <tr>
                  <td className="tg-0lax cell-dark-grey" colSpan="2">Cronbach Alpha</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.cronbachAlpha}</td>
                </tr>
                <tr>
                  <td className="tg-0lax cell-dark-grey fs-normal fs-italic" colSpan="2">Internal Reliability</td>
                  <td className="tg-0lax cell-light-grey">{result.rawScore.internalReliability}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
