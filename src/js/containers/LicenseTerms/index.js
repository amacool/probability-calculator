import React from "react";
import { bindActionCreators } from "redux";
import calcActions from "../../redux/calc/actions";
import connect from "react-redux/es/connect/connect";
import pathActions from "../../redux/path/actions";
import RichTextEditor from 'react-rte';
import "./style.css";

function LicenseTerms({ licenseTermsInfo, updateLicenseTermsInfo, setPath, isAuthenticated }) {
  const [value, setValue] = React.useState(RichTextEditor.createValueFromString(licenseTermsInfo, 'html'));

  return (
    <div className="license-terms-container">
      <div>
        {isAuthenticated ? (
          <>
            <RichTextEditor
              value={value}
              onChange={(v) => setValue(v)}
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
          </>
        ) : (
          <div dangerouslySetInnerHTML={{__html: value.toString('html')}} />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  licenseTermsInfo: state.Calc.licenseTermsInfo,
  isAuthenticated: state.Calc.isAuthenticated
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
