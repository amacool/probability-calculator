import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./containers/Main";
import "./App.css";
import './fonts/index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-body">
          <Main/>
        </div>
        <div className="App-footer">
          <div className="footer-container">
            <div>
              <p>License expires on 10/05/2019</p>
              <p>License Terms & Conditions</p>
            </div>
            <div>
              <p>v. 2.51 Last Updated June 26, 2019</p>
              <p>Copyright © 2004 - 2019 Measuring Usability LLC</p>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
