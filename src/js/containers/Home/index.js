import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import { Logo } from "../../components/Logo";
import { PoweredBy } from "../../components/PoweredBy";
import calcActions from "../../redux/calc/actions";
import { authCheck } from "../../helper";
import "./style.css";

function Home({
  path,
  setPath,
  setCalcMode,
  isAuthenticated,
  hashedAdminPwd,
  hashedUserPwd,
  setAuthentication
}) {
  const [password, setPassword] = React.useState('');

  return (
    <div className="container home-container">
      <header className="App-header">
        <div className="logo">
          <Logo big={true} />
        </div>
        <div className="powered-by">
          <div>
            <p>Powered By</p>
            <PoweredBy/>
          </div>
        </div>
      </header>
      <div className="home-body">
        <div className="navigation-container">
          {isAuthenticated ? (
            <>
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
              <button onClick={() => setPath('manage-supr')} className={`${path === 'manage-sup' ? 'active' : ''}`}>Manage SUPR-Q</button>
              <button onClick={() => setPath('about')} className={`${path === 'enter-raw' ? 'active' : ''}`}>About the SUPR-Q</button>
            </>
          ) : (
            <div className="login-wrapper">
              <span>Please input password.</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button
                onClick={() => {
                  const isAdmin = authCheck(hashedAdminPwd, password);
                  const isUser = authCheck(hashedUserPwd, password);
                  if (!isAdmin && !isUser) {
                    alert('Incorrect Password!');
                  } else {
                    setAuthentication(true);
                  }
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  path: state.Path.path,
  hashedAdminPwd: state.Calc.hashedAdminPwd,
  hashedUserPwd: state.Calc.hashedUserPwd,
  isAuthenticated: state.Calc.isAuthenticated
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
