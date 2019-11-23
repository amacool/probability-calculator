import React from "react";
import { ResultHeader } from "./ResultHeader"
import { questionHeading } from "../../constants";
import { downloadAsPng } from "../../helper";

export const RawMeans = ({ result, drawChart }) => {
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
        heading="Raw Means by Questionnaire Item"
      />
      {visible && (
        <div className="result-body">
          <div className="result-body-inner-wrapper">
            <table className="tg result-table">
              <tr>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2"></th>
                <th className="tg-cly1 cell-light-blue" rowSpan="2">Raw Mean</th>
                <th className="tg-cly1 cell-dark-grey" colSpan="2">Confidence Interval</th>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2">Standard<br/>Deviation</th>
                <th className="tg-cly1 cell-dark-grey" rowSpan="2">Sample<br/>Size</th>
              </tr>
              <tr>
                <td className="tg-cly1 cell-dark-grey">Low</td>
                <td className="tg-cly1 cell-dark-grey">High</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q1: EasyUse</td>
                <td className="tg-cly1">{result[0].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[0].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q2: EasyNavigate</td>
                <td className="tg-cly1">{result[1].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[1].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q3: InfoTrustworthy</td>
                <td className="tg-cly1">{result[2].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[2].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q4: InfoCredible</td>
                <td className="tg-cly1">{result[3].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[3].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q5: NPS</td>
                <td className="tg-cly1">{result[4].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[4].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-cly1 cell-light-blue">Q6: VisitFuture</td>
                <td className="tg-cly1">{result[5].mean}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].low}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].high}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].stdDev}</td>
                <td className="tg-cly1 cell-light-grey">{result[5].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-0lax cell-light-blue">Q7: FindAttractive</td>
                <td className="tg-0lax">{result[6].mean}</td>
                <td className="tg-0lax cell-light-grey">{result[6].low}</td>
                <td className="tg-0lax cell-light-grey">{result[6].high}</td>
                <td className="tg-0lax cell-light-grey">{result[6].stdDev}</td>
                <td className="tg-0lax cell-light-grey">{result[6].sampleSize}</td>
              </tr>
              <tr>
                <td className="tg-0lax cell-light-blue">Q8: CleanSimple</td>
                <td className="tg-0lax">{result[7].mean}</td>
                <td className="tg-0lax cell-light-grey">{result[7].low}</td>
                <td className="tg-0lax cell-light-grey">{result[7].high}</td>
                <td className="tg-0lax cell-light-grey">{result[7].stdDev}</td>
                <td className="tg-0lax cell-light-grey">{result[7].sampleSize}</td>
              </tr>
            </table>
            <div className="chart-container" id="chart-raw-values-by-question-container">
              <div>
                <div id="chart-raw-values-by-question" />
                <div className="labels">
                  {questionHeading.filter((item, index) => index !== 4).map(item => <p>{item.desc}</p>)}
                </div>
              </div>
              <div>
                <div id="chart-raw-values-by-question-single" />
                <div className="labels single-label">
                  <p>I would recommend the website to a friend or colleague.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="export-btn-container">
            <button className="btn-primary" onClick={() => downloadAsPng('chart-raw-values-by-question-container', 'Raw Means by Questionnaire Item')}>Export Chart</button>
          </div>
        </div>
      )}
    </div>
  );
};
