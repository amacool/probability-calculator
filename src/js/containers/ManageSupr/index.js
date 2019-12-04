import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import DayPickerInput from "react-day-picker/DayPickerInput";
import dateFnsFormat from "date-fns/format";
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import { toast } from 'react-toastify';
import calcActions from "../../redux/calc/actions";
import { md5 } from "../../helper/md5";
import { exportJson, authCheck } from "../../helper";
import "react-day-picker/lib/style.css";
import "./style.css";

function ManageSupr({
  setConstantsData,
  updateWebsiteData,
  websiteData,
  maxScore,
  globalInMean,
  globalLnSD,
  isAuthenticated,
  hashedAdminPwd,
  setAuthentication
}) {
  const [tMaxScore, setTMaxScore] = React.useState(maxScore);
  const [tGlobalInMean, setTGlobalInMean] = React.useState(globalInMean);
  const [tGlobalLnSD, setTGlobalLnSD] = React.useState(globalLnSD);
  const fileInput = React.useRef();
  const [adminPwd, setAdminPwd] = React.useState('');
  const [newAdminPwd, setNewAdminPwd] = React.useState('');
  // const [userPwd, setUserPwd] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState();
  const FORMAT = 'MM/dd/yyyy';

  React.useEffect(() => {
    setTMaxScore(maxScore);
    setTGlobalInMean(globalInMean);
    setTGlobalLnSD(globalLnSD);
  }, [maxScore, globalInMean, globalLnSD]);

  const handleLogIn = () => {
    const isAdmin = authCheck(hashedAdminPwd, password);
    if (!isAdmin) {
      toast.error('Incorrect Password!', {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
    } else {
      setAuthentication(isAdmin ? 1 : 2);
    }
  };

  const getSplittedData = (data) => {
    if (typeof data === "object") {
      return data;
    }
    let splitter = '\t';
    if (data.indexOf(',') >= 0) {
      splitter = ',';
    }
    const arr = data.replace('\n', '').replace(' ', '').split(splitter);
    if (arr.length !== 7) {
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === '' || isNaN(arr[i])) {
        return false;
      }
    }
    return arr;
  };

  React.useEffect(() => {
    fileInput.current && fileInput.current.addEventListener('change', function() {
      let file = fileInput.current.files[0];
      if (!file) return;
      if (file.name.match(/\.(json)$/)) {
        let reader = new FileReader();

        reader.onload = function() {
          try {
            const { tMaxScore, tGlobalInMean, tGlobalLnSD, tWebsiteData } = JSON.parse(reader.result);
            const v1 = getSplittedData(tMaxScore);
            const v2 = getSplittedData(tGlobalInMean);
            const v3 = getSplittedData(tGlobalLnSD);
            if (v1 && v2 && v3) {
              setConstantsData({
                tMaxScore: v1,
                tGlobalInMean: v2,
                tGlobalLnSD: v3,
              });
              updateWebsiteData(tWebsiteData);
              toast.info('Imported Successfully!', {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
            } else {
              let errMsg = '';
              let isValid = [false, false, false];
              if (!v1) {
                errMsg += 'Max Score, ';
                isValid[0] = true;
              }
              if (!v2) {
                errMsg += 'Global In Mean, ';
                isValid[1] = true;
              }
              if (!v3) {
                errMsg += 'Global Ln SD, ';
                isValid[2] = true;
              }
              errMsg = errMsg.substr(0, errMsg.length - 2);
              toast.error("Invalid data input! " + errMsg, {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
            }
          } catch (err) {
            toast.error("Invalid data format!", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
          }
        };

        reader.readAsText(file);
      } else {
        toast.error('File not supported, .json file only', {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
      }
    });
  }, [fileInput]);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div className="content-header">
            <div>
              <h2>Manage SUPR-Q</h2>
              <p>
                Import predefined calculation variables and websites data.
                <br/>
                Set authorization to the app.
              </p>
            </div>
          </div>
          <div className="content-body">
            <h3 className="rating-card-heading">IMPORT & EXPORT DATA</h3>
            <p>Separate values by comma(,) or copy and paste from excel.</p>
            <div className="import-constants">
              <div>
                <p> - Max Score</p>
                <textarea value={tMaxScore} onChange={(e) => setTMaxScore(e.target.value)} className={!getSplittedData(tMaxScore) ? 'invalid' : ''} />
              </div>
              <div>
                <p> - Global In Mean</p>
                <textarea value={tGlobalInMean} onChange={(e) => setTGlobalInMean(e.target.value)} className={!getSplittedData(tGlobalInMean) ? 'invalid' : ''} />
              </div>
              <div>
                <p> - Global Ln SD</p>
                <textarea value={tGlobalLnSD} onChange={(e) => setTGlobalLnSD(e.target.value)} className={!getSplittedData(tGlobalLnSD) ? 'invalid' : ''} />
              </div>
            </div>
            <h3 className="rating-card-heading">SET EXPIRATION DATE</h3>
            <div className="set-expiration-date">
              <div>
                <DayPickerInput
                  id="day-picker-input"
                  className="invalid"
                  value={expirationDate}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  localeUtils={MomentLocaleUtils}
                  placeholder="MM/DD/YYYY"
                  onDayChange={(v) => {
                    if (!v) return;
                    setExpirationDate(dateFnsFormat(v, FORMAT));
                  }}
                  inputProps={{
                    className: expirationDate ? '' : 'invalid'
                  }}
                />
              </div>
            </div>
            <h3 className="rating-card-heading">SET PASSWORD</h3>
            <p>Set admin and user passwords.</p>
            <div className="import-constants">
              <div>
                <p> - Current Admin Password</p>
                <input type="password" value={adminPwd} onChange={(e) => setAdminPwd(e.target.value)} className={!adminPwd ? 'invalid' : ''} />
              </div>
              <div>
                <p> - New Admin Password</p>
                <input type="password" value={newAdminPwd} onChange={(e) => setNewAdminPwd(e.target.value)} className={!newAdminPwd ? 'invalid' : ''} />
                <span>{newAdminPwd && md5(newAdminPwd)}</span>
              </div>
              {/*<div>*/}
                {/*<p> - New User Password</p>*/}
                {/*<input type="password" value={userPwd} onChange={(e) => setUserPwd(e.target.value)} className={!userPwd ? 'invalid' : ''} />*/}
                {/*<span>{userPwd && md5(userPwd)}</span>*/}
              {/*</div>*/}
            </div>
            <div className="import-btn-container">
              <button
                className="btn-secondary"
                onClick={() => {
                  if (!expirationDate) {
                    toast.error("Please Input Expiration Date!", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
                    return;
                  }
                  if (!authCheck(hashedAdminPwd, adminPwd)) {
                    toast.error("Incorrect Admin Password!", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
                    return;
                  }
                  if (!newAdminPwd) {
                    toast.error("Please Input Admin Password!", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
                    return;
                  }
                  const v1 = getSplittedData(tMaxScore);
                  const v2 = getSplittedData(tGlobalInMean);
                  const v3 = getSplittedData(tGlobalLnSD);
                  const date = new Date(expirationDate);
                  if (v1 && v2 && v3) {
                    exportJson({
                      tMaxScore: v1,
                      tGlobalInMean: v2,
                      tGlobalLnSD: v3,
                      tWebsiteData: websiteData,
                      hashedAdminPwd: md5(newAdminPwd),
                      expirationDate: date.getTime()/12321
                      // hashedUserPwd: md5(userPwd)
                    });
                  } else {
                    let errMsg = '';
                    if (!v1) {
                      errMsg += 'Max Score, ';
                    }
                    if (!v2) {
                      errMsg += 'Global In Mean, ';
                    }
                    if (!v3) {
                      errMsg += 'Global Ln SD, ';
                    }
                    errMsg = errMsg.substr(0, errMsg.length - 2);
                    toast.error("Invalid data input! " + errMsg, {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
                  }
                }}
              >
                Export to File
              </button>
              <button
                className="btn-secondary btn-import-file"
                onClick={() => {
                  if (!authCheck(hashedAdminPwd, adminPwd)) {
                    toast.error("Incorrect Admin Password!", {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 10000});
                    return;
                  }
                  document.getElementById('file-input').click();
                }
              }>
                <span>Import from File</span>
                <input id="file-input" type="file" ref={fileInput} />
              </button>
            </div>
          </div>
        </>) : (
          <div className="login-wrapper">
            <span>Please input password.</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  handleLogIn();
                }
              }}
              autoFocus
            />
            <button onClick={handleLogIn}>Sign In</button>
          </div>
        )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  maxScore: state.Calc.maxScore,
  globalInMean: state.Calc.globalInMean,
  globalLnSD: state.Calc.globalLnSD,
  websiteData: state.Calc.websiteData,
  hashedAdminPwd: state.Calc.hashedAdminPwd,
  isAuthenticated: state.Calc.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setConstantsData: (data) => calcActions.setConstantsData(data),
      updateWebsiteData: (data) => calcActions.updateWebsiteData(data),
      setAuthentication: (data) => calcActions.setAuthentication(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupr);
