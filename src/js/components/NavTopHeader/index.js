import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import pathActions from "../../redux/path/actions";
import "./style.css";

function NavTopHeader({ path, setPath }) {
  return (
    <div className="nav-header">
      <div className="left">
        <button onClick={() => setPath('enter-raw')} className={`btn-nav ${path === 'enter-raw' || path === 'enter-summary' ? 'active' : ''}`}>Enter Data</button>
        <button onClick={() => setPath('view-results')} className={`btn-nav ${path === 'view-results' ? 'active' : ''}`}>View Results</button>
      </div>
      <div className="right">
        <button onClick={() => setPath('view-databases')} className={`btn-nav ${path === 'view-databases' ? 'active' : ''}`}>All Websites</button>
        <button onClick={() => setPath('about')} className={`btn-nav ${path === 'about' ? 'active' : ''}`}>About the SUPR-Q</button>
        <button onClick={() => setPath('manage-supr')} className={`btn-nav ${path === 'manage-supr' ? 'active' : ''}`}>Manage SUPR-Q</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavTopHeader);
