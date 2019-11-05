import React from "react";
import { ResultHeader } from "./ResultHeader";

export const PercentileRanks = ({ result, drawChart }) => {
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
        heading="Percentile Ranks by Attribute"
      />
      {visible && (
        <div className="result-body">
          <div className="result-body-inner-wrapper">
            <table className="tg result-table">
              <tr>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2"></th>
                <th className="tg-cly1 cell-dark-blue" rowSpan="2">Percentile Rank</th>
                <th className="tg-cly1 cell-dark-grey" colSpan="2">Confidence Interval</th>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2">Standard Deviation</th>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2">Sample Size</th>
              </tr>
              <tr>
                <td className="tg-cly1 cell-dark-grey">Low</td>
                <td className="tg-cly1 cell-dark-grey">High</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-dark-blue">SUPR-Q (Overall)</td>
                <td className="tg-cly1 fs-18">{result[0].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Usability</td>
                <td className="tg-cly1 fs-18">{result[1].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Credibility (Trust)</td>
                <td className="tg-cly1 fs-18">{result[2].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Loyalty</td>
                <td className="tg-cly1 fs-18">{result[3].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Appearance</td>
                <td className="tg-cly1 fs-18">{result[4].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-dark-grey">NPS (Raw %)</td>
                <td className="tg-cly1 cell-light-grey">{result[5].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].sampleSize}</td>
              </tr>
            </table>
            <div id="chart-percentile-by-attr" />
          </div>
        </div>
      )}
    </div>
  );
};
