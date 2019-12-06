import React from "react";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import connect from "react-redux/es/connect/connect";
import pathActions from "../../redux/path/actions";
import RichTextEditor from 'react-rte';
import "./style.css";

function LicenseTerms({ licenseTermsInfo, updateLicenseTermsInfo, setPath }) {
  console.log(licenseTermsInfo);
  const [value, setValue] = React.useState(RichTextEditor.createValueFromString(licenseTermsInfo, 'html'));

  const onChange = (v) => {
    setValue(v);
  };

  return (
    <div className="license-terms-container">
      <div>
        <RichTextEditor
          value={value}
          onChange={onChange}
        />
        <br/>
        <button
          className="btn-secondary"
          onClick={() => {
            updateLicenseTermsInfo(value.toString('html'));
            setPath('manage-supr');
          }}
        >
          Export As Calc Params
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  licenseTermsInfo: state.Calc.licenseTermsInfo,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateLicenseTermsInfo: (data) => calcActions.updateLicenseTermsInfo(data),
      setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LicenseTerms);
