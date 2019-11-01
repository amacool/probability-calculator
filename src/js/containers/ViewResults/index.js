import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
// import calcActions from "../../redux/path/actions";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { OverallSupr } from "./OverallSupr";
import { PercentileRanks } from "./PercentileRanks";
import { RawScores } from "./RawScores";
import { SusEquivalents } from "./SusEquivalents";
import { IndividualRawValues } from "./IndividualRawValues";
import { RawMeans } from "./RawMeans";
import { getCalcResult } from "../../calculation/logic";
import { parseRawDataToInt } from "../../helper";
import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    fontSize: '12px'
  }
}));

function ViewResults({ history, location, rawData, path }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    confidenceLevel: 0.9
  });
  const [result, setResult] = React.useState({
    percentileRanksBA: [{}, {}, {}, {}, {}, {}],
    rawScoresBA: [{}, {}, {}, {}, {}, {}],
    individualRawValuesBA: [],
    rawMeansByQ: [{}, {}, {}, {}, {}, {}, {}, {}],
    overallResults: {
      percentileRank: {
        percentileRank: '',
        ciLow: '',
        ciHigh: '',
        marginOfError: ''
      },
      rawScore: {
        ciLow: '',
        ciHigh: '',
        stdDev: '',
        sampleSize: '',
        cronbachAlpha: '',
        internalReliability: ''
      }
    }
    // {
    //   suprQ: [],
    //   usability: [],
    //   trust,
    //   loyalty,
    //   appearance
    // }
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    const aa = getCalcResult(parseRawDataToInt(rawData), values.confidenceLevel);
    console.log('result: ', aa);
    setResult(aa);
  }, []);

  React.useEffect(() => {
    const aa = getCalcResult(parseRawDataToInt(rawData), values.confidenceLevel);
    console.log('result: ', aa);
    setResult(aa);
  }, [values.confidenceLevel]);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <div className="c-level-container">
        <span>Confidence Level</span>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          </InputLabel>
          <Select
            value={values.confidenceLevel}
            onChange={handleChange}
            labelWidth={labelWidth}
            inputProps={{
              name: 'confidenceLevel',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={0.95}>95%</MenuItem>
            <MenuItem value={0.9}>90%</MenuItem>
            <MenuItem value={0.5}>50%</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="view-result-body">
        <OverallSupr result={result.overallResults} />
        <PercentileRanks result={result.percentileRanksBA} />
        <RawScores result={result.rawScoresBA} />
        <SusEquivalents />
        <IndividualRawValues result={result.individualRawValuesBA} />
        <RawMeans result={result.rawMeansByQ} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rawData: state.Calc.rawData,
  path: state.Path.path
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewResults);
