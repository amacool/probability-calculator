import React from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const ResultHeader = ({ visible, setVisible, heading }) => (
  <div className="result-header">
    {visible ? <KeyboardArrowUpIcon onClick={() => setVisible(!visible)} /> : <KeyboardArrowDownIcon onClick={() => setVisible(!visible)} />}
    <h3>{heading}</h3>
  </div>
);
