import React from "react";
import connect from "react-redux/es/connect/connect";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "./containers/Main";
import "./App.css";
import '../assets/fonts/index.css';
import {bindActionCreators} from "redux";
import pathActions from "./redux/path/actions";

function App({ expirationDate, setPath }) {
  const date = new Date(expirationDate);
  return (
    <div className="App">
      <div className="App-body">
        <Main/>
      </div>
      <div className="App-footer">
        <div className="footer-container">
          <div>
            <p>License expires on {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}</p>
            <p className="btn-license-terms" onClick={() => setPath("license-terms")}>License Terms & Conditions</p>
          </div>
          <div>
            <p>v. 2.51 Last Updated June 26, 2019</p>
            <p>Copyright © 2004 - 2019 Measuring Usability LLC</p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expirationDate: state.Calc.expirationDate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
