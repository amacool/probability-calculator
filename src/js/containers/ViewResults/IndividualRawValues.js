import React from "react";
import { ResultHeader } from "./ResultHeader";

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
          <div className="result-body-inner-wrapper">
            <table className="tg result-table">
              <tr>
                <th className="tg-cly1 cell-dark-blue">SUPR-Q (Overall)</th>
                <th className="tg-cly1 cell-light-blue">Usability</th>
                <th className="tg-cly1 cell-light-blue">Credibility (Trust)</th>
                <th className="tg-0lax cell-light-blue">Loyalty</th>
                <th className="tg-0lax cell-light-blue">Appearance</th>
              </tr>
              {result.map((item, index) => (
                <tr key={index}>
                  <td className="tg-cly1">{item[0]}</td>
                  <td className="tg-cly1">{item[1]}</td>
                  <td className="tg-cly1">{item[2]}</td>
                  <td className="tg-0lax">{item[3]}</td>
                  <td className="tg-0lax">{item[4]}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
