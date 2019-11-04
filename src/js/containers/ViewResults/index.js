import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
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
import { drawOverallPercentileChart, drawOverallRawScoreChart, drawBarChart } from "./charts/OverallCharts";
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
        rawScore: '',
        ciLow: '',
        ciHigh: '',
        stdDev: '',
        sampleSize: '',
        cronbachAlpha: '',
        internalReliability: ''
      }
    },
    susEquivalents: {
      suprQ: ['', ''],
      usability: ['', ''],
      susEquivalent: ['', '']
    }
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const drawCharts = (data) => {
    drawOverallPercentileChart({
      low: data.overallResults.percentileRank.ciLow.replace('%', ''),
      high: data.overallResults.percentileRank.ciHigh.replace('%', ''),
      val: data.overallResults.percentileRank.percentileRank.replace('%', ''),
      target: "chart-overall-percentile-bar"
    });
    drawOverallRawScoreChart({
      rawScore: parseFloat(data.overallResults.rawScore.rawScore),
      percentileRank: parseFloat(data.overallResults.percentileRank.percentileRank.replace('%', '')),
      maxScore: 5,
      historicalAvgScore: 3.97,
      target: "chart-overall-percentile-line"
    });
    drawBarChart({
      attrs: {
        "Overall": data.percentileRanksBA[0],
        "Usability": data.percentileRanksBA[1],
        "Credibility": data.percentileRanksBA[2],
        "Loyalty": data.percentileRanksBA[3],
        "Appearance": data.percentileRanksBA[4]
      },
      maxVal: 100,
      countY: 5,
      target: "chart-percentile-by-attr"
    });
    drawBarChart({
      attrs: {
        "Overall": data.percentileRanksBA[0],
        "Usability": data.percentileRanksBA[1],
        "Credibility": data.percentileRanksBA[2],
        "Loyalty": data.percentileRanksBA[3],
        "Appearance": data.percentileRanksBA[4]
      },
      maxVal: 5,
      countY: 4,
      target: "chart-raw-scores-by-attr"
    });
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    const result = getCalcResult(parseRawDataToInt(rawData), values.confidenceLevel);
    setResult(result);
  }, []);

  React.useEffect(() => {
    const result = getCalcResult(parseRawDataToInt(rawData), values.confidenceLevel);
    setResult(result);
    drawCharts(result);
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
        <OverallSupr result={result.overallResults} confLevel={values.confidenceLevel} drawChart={() => drawCharts(result)} />
        <PercentileRanks result={result.percentileRanksBA} drawChart={() => drawCharts(result)} />
        <RawScores result={result.rawScoresBA} drawChart={() => drawCharts(result)} />
        <SusEquivalents result={result.susEquivalents} drawChart={() => drawCharts(result)} />
        <IndividualRawValues result={result.individualRawValuesBA} />
        <RawMeans result={result.rawMeansByQ} drawChart={() => drawCharts(result)} />
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
