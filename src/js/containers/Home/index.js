import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import { Logo } from "../../components/Logo";
import { PoweredBy } from "../../components/PoweredBy";
import "./style.css";

function Home({ path, setPath }) {
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
          <button onClick={() => setPath('enter-raw')} className={`enter-data ${path === 'enter-raw' ? 'active' : ''}`}>Enter Raw Data</button>
          <button onClick={() => setPath('enter-summary')} className={`enter-data ${path === 'enter-raw' ? 'active' : ''}`}>Enter Summary Data</button>
          <button onClick={() => setPath('view-results')} className={`${path === 'enter-raw' ? 'active' : ''}`}>View Results Dashboard</button>
          <button onClick={() => setPath('view-databases')} className={`${path === 'enter-raw' ? 'active' : ''}`}>View Database for All Websites</button>
          <button onClick={() => setPath('manage-supr')} className={`${path === 'manage-sup' ? 'active' : ''}`}>Manage SUPR-Q</button>
          <button onClick={() => setPath('about')} className={`${path === 'enter-raw' ? 'active' : ''}`}>About the SUPR-Q</button>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
