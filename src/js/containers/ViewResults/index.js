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
import { parseRawDataToInt, getSortedData } from "../../helper";
import {
  drawOverallPercentileChart,
  drawOverallRawScoreChart,
  drawBarChart,
  drawSusEquivalentChart
} from "./charts/OverallCharts";
import { questionHeading } from "../../constants";
import './style.css';

const questionDesc = questionHeading.map(item => item.desc);

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

function ViewResults({ history, location, rawData, rawColumnOrder }) {
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
      target: "chart-overall-percentile-bar",
      width: 700,
      height: 150
    });
    drawOverallRawScoreChart({
      rawScore: parseFloat(data.overallResults.rawScore.rawScore),
      percentileRank: parseFloat(data.overallResults.percentileRank.percentileRank.replace('%', '')),
      maxScore: 5,
      historicalAvgScore: 3.96,
      target: "chart-overall-percentile-line",
      widthT: 650,
      heightT: 200
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
      pacingY: 20,
      target: "chart-percentile-by-attr",
      showLabel: true,
      barWidth: 34,
      widthT: 400,
      heightT: 220
    });
    drawBarChart({
      attrs: {
        "Overall": data.rawScoresBA[0],
        "Usability": data.rawScoresBA[1],
        "Credibility": data.rawScoresBA[2],
        "Loyalty": data.rawScoresBA[3],
        "Appearance": data.rawScoresBA[4]
      },
      maxVal: 5,
      countY: 4,
      pacingY: 1,
      target: "chart-raw-scores-by-attr",
      showLabel: true,
      barWidth: 34,
      widthT: 400,
      heightT: 220
    });
    drawBarChart({
      attrs: {
        [questionDesc[0]]: data.rawMeansByQ[0],
        [questionDesc[1]]: data.rawMeansByQ[1],
        [questionDesc[2]]: data.rawMeansByQ[2],
        [questionDesc[3]]: data.rawMeansByQ[3],
        [questionDesc[5]]: data.rawMeansByQ[5],
        [questionDesc[6]]: data.rawMeansByQ[6],
        [questionDesc[7]]: data.rawMeansByQ[7]
      },
      maxVal: 5,
      countY: 4,
      pacingY: 1,
      target: "chart-raw-values-by-question",
      showLabel: false,
      barWidth: 34,
      widthT: 450,
      heightT: 220
    });
    drawBarChart({
      attrs: {
        [questionDesc[4]]: data.rawMeansByQ[4]
      },
      maxVal: 10,
      countY: 5,
      pacingY: 2,
      target: "chart-raw-values-by-question-single",
      showLabel: false,
      barWidth: 34,
      widthT: 120,
      heightT: 220,
    });
    drawSusEquivalentChart({
      susScore: parseFloat(data.susEquivalents.susEquivalent[1]),
      rawScore: parseFloat(data.overallResults.rawScore.rawScore),
      percentileRank: parseFloat(data.overallResults.percentileRank.percentileRank.replace('%', '')),
      maxScore: 100,
      historicalAvgScore: 3.9,
      target: "chart-sus-equivalent-chart",
      widthT: 650,
      heightT: 200
    });
  };

  React.useEffect(() => {
    if (rawData.length === 0) {
      return;
    }
    setLabelWidth(inputLabel.current.offsetWidth);
    const result = getCalcResult(parseRawDataToInt(getSortedData(rawData, rawColumnOrder)), values.confidenceLevel);
    setResult(result);
  }, []);

  React.useEffect(() => {
    if (rawData.length === 0) {
      return;
    }
    const result = getCalcResult(parseRawDataToInt(getSortedData(rawData, rawColumnOrder)), values.confidenceLevel);
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
        <div>
          <span>Error bars represent {values.confidenceLevel*100}% confidence intervals.</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rawData: state.Calc.rawData,
  rawColumnOrder: state.Calc.rawColumnOrder
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // setPath: (data) => pathActions.setPath(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewResults);
