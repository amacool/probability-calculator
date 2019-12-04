import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import calcActions from "../../redux/calc/actions";
import BigLogo from "../../../assets/images/logo.png";
import MeasuringULogo from "../../../assets/images/MeasuringU_Logo.png";
import "./style.css";

function Home({
  path,
  setPath,
  setCalcMode,
  isAuthenticated,
  expirationDate
}) {
  const date = new Date(expirationDate);
  const isExpired = expirationDate < Date.now();

  return (
    <div className="container home-container">
      <header className="App-header">
        <div className="logo">
          <img src={BigLogo} alt="" />
        </div>
        <div className="powered-by">
          <div>
            <a href="https://www.measuringu.com">
              <p>Powered By</p>
              <img src={MeasuringULogo} alt="" />
            </a>
          </div>
        </div>
      </header>
      <div className="home-body">
        {isExpired ? (
          <div>
            License has already expired on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}.
          </div>
        ) : (
          <div className="navigation-container">
            <button
              onClick={() => {
                setCalcMode('raw');
                setPath('enter-raw');
              }}
              className={`enter-data ${path === 'enter-raw' ? 'active' : ''}`}
            >
              Enter Raw Data
            </button>
            <button
              onClick={() => {
                setCalcMode('summary-all');
                setPath('enter-summary');
              }}
              className={`enter-data ${path === 'enter-raw' ? 'active' : ''}`}
            >
              Enter Summary Data
            </button>
            <button onClick={() => setPath('view-results')} className={`${path === 'enter-raw' ? 'active' : ''}`}>View Results Dashboard</button>
            <button onClick={() => setPath('view-databases')} className={`${path === 'enter-raw' ? 'active' : ''}`}>View Database for All Websites</button>
            {isAuthenticated === 1 && <button onClick={() => setPath('manage-supr')} className={`${path === 'manage-supr' ? 'active' : ''}`}>Manage SUPR-Q</button>}
            <button onClick={() => setPath('about')} className={`${path === 'enter-raw' ? 'active' : ''}`}>About the SUPR-Q</button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path,
  hashedAdminPwd: state.Calc.hashedAdminPwd,
  hashedUserPwd: state.Calc.hashedUserPwd,
  isAuthenticated: state.Calc.isAuthenticated,
  expirationDate: state.Calc.expirationDate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data),
      setCalcMode: (data) => calcActions.setCalcMode(data),
      setAuthentication: (data) => calcActions.setAuthentication(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
