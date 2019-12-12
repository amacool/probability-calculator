import React from "react";
import { downloadAsPng, downloadAsSvg } from "../../helper";
import { ResultHeader } from "./ResultHeader";

export const OverallSupr = ({ result, confLevel, drawChart }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="result-container">
      <ResultHeader
        visible={visible}
        setVisible={(val) => {
          setVisible(val);
          setTimeout(function() {
            drawChart();
          });
        }}
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
            <div id="chart-overall-percentile-bar">
              <p className="chart-desc">We can be {confLevel*100}% confident the population mean SUPR-Q Score is above {result.percentileRank.ciLow}.</p>
            </div>
            {/*<div className="export-btn-container">*/}
              {/*<button className="btn-primary" onClick={() => downloadAsPng('chart-overall-percentile-bar', 'Overall SUPR-Q Results - 1')}>Export Chart</button>*/}
              {/*<button className="btn-primary" onClick={() => downloadAsSvg('chart-overall-percentile-bar-svg', 'Overall SUPR-Q Results - 1')}>Export Chart</button>*/}
            {/*</div>*/}
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
            <div id="chart-overall-percentile-line">
              <p className="chart-desc">A raw score of {result.rawScore.rawScore} is higher than {result.percentileRank.percentileRank} of websites in the database</p>
            </div>
            {/*<div className="export-btn-container">*/}
              {/*<button className="btn-primary" onClick={() => downloadAsPng('chart-overall-percentile-line', 'Overall SUPR-Q Results - 2')}>Export Chart</button>*/}
            {/*</div>*/}
          </div>
        </div>
      )}
    </div>
  );
};
