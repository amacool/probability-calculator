import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import Home from "../Home";
import EnterRawData from "../EnterRawData";
import EnterSummaryData from "../EnterSummaryData";
import ViewResults from "../ViewResults";
import ViewDatabases from "../ViewDatabases";
import ManageSupr from "../ManageSupr";
import About from "../About";
import LicenseTerms from "../LicenseTerms";
import NavTopHeader from "../../components/NavTopHeader";
import { Logo } from "../../components/Logo";
import { PoweredBy } from "../../components/PoweredBy";
import "./style.css";

function Main({ path, setPath }) {
  return (
    <>
      {path === 'home'
      ? <Home/>
      : (
        <div className="container home-container">
          <header className="main-header">
            <div className="main-header-top">
              <div className="main-logo" onClick={() => setPath('home')}>
                <Logo big={false} />
                <p>Calculator</p>
              </div>
              <div className="logo-second">
                <a href="https://www.measuringu.com">
                  <PoweredBy/>
                </a>
              </div>
            </div>
            <NavTopHeader/>
          </header>
          <div className="main-body">
            {path === 'enter-raw' && <EnterRawData/>}
            {path === 'enter-summary' && <EnterSummaryData/>}
            {path === 'view-results' && <ViewResults/>}
            {path === 'view-databases' && <ViewDatabases/>}
            {path === 'manage-supr' && <ManageSupr/>}
            {path === 'about' && <About/>}
            {path === 'license-terms' && <LicenseTerms/>}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
