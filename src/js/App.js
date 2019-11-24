import React from "react";
import connect from "react-redux/es/connect/connect";
import Main from "./containers/Main";
import "./App.css";
import './fonts/index.css';

function App({ expirationDate }) {
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
            <p>License Terms & Conditions</p>
          </div>
          <div>
            <p>v. 2.51 Last Updated June 26, 2019</p>
            <p>Copyright © 2004 - 2019 Measuring Usability LLC</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expirationDate: state.Calc.expirationDate
});

export default connect(mapStateToProps, null)(App);
