import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { toast } from 'react-toastify';
import calcActions from "../../redux/calc/actions";
import { OverallSupr } from "./OverallSupr";
import { PercentileRanks } from "./PercentileRanks";
import { RawScores } from "./RawScores";
import { SusEquivalents } from "./SusEquivalents";
import { IndividualRawValues } from "./IndividualRawValues";
import { RawMeans } from "./RawMeans";
import { getCalcResult } from "../../calculation/logic";
import { parseRawDataToInt, parseRawDataToFloat, getSortedData } from "../../helper";
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

function ViewResults({
  rawData,
  rawColumnOrder,
  summaryData,
  calcMode,
  setCalcResult,
  maxScore,
  globalInMean,
  globalLnSD
}) {
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

  const doValidation = () => {
    if (maxScore.length < 1 || globalInMean.length < 1 || globalLnSD.length < 1) {
      toast.error('One or more static values are empty!', {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 5000});
      return false;
    }
    return true;
  };

  const drawCharts = (data) => {
    drawOverallPercentileChart({
      low: data.overallResults.percentileRank.ciLow.replace('%', ''),
      high: data.overallResults.percentileRank.ciHigh.replace('%', ''),
      val: data.overallResults.percentileRank.percentileRank.replace('%', ''),
      target: "chart-overall-percentile-bar",
      width: 686,
      height: 150
    });
    drawOverallRawScoreChart({
      rawScore: parseFloat(data.overallResults.rawScore.rawScore),
      percentileRank: parseFloat(data.overallResults.percentileRank.percentileRank.replace('%', '')),
      maxScore: 5,
      historicalAvgScore: 3.96,
      target: "chart-overall-percentile-line",
      widthT: 650,
      heightT: 170
    });
    calcMode !== 'summary-single' && drawBarChart({
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
      widthT: 390,
      heightT: 190
    });

    calcMode !== 'summary-single'  && drawBarChart({
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
      widthT: 390,
      heightT: 190
    });
    calcMode === 'raw' && calcMode !== 'summary-single' && drawBarChart({
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
      widthT: 420,
      heightT: 220
    });
    calcMode === 'raw' && calcMode !== 'summary-single' && drawBarChart({
      attrs: {
        [questionDesc[4]]: data.rawMeansByQ[4]
      },
      maxVal: 10,
      countY: 5,
      pacingY: 2,
      target: "chart-raw-values-by-question-single",
      showLabel: false,
      barWidth: 34,
      widthT: 110,
      heightT: 220,
    });
    calcMode !== 'summary-single' && drawSusEquivalentChart({
      susScore: parseFloat(data.susEquivalents.susEquivalent[1]),
      rawScore: parseFloat(data.overallResults.rawScore.rawScore),
      percentileRank: parseFloat(data.overallResults.percentileRank.percentileRank.replace('%', '')),
      maxScore: 100,
      historicalAvgScore: 3.9,
      target: "chart-sus-equivalent-chart",
      widthT: 600,
      heightT: 180
    });
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    if (!doValidation()) {
      return;
    }
    let result = '';
    if (calcMode === 'raw') {
      result = getCalcResult(parseRawDataToInt(getSortedData(rawData, rawColumnOrder)), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    } else if (calcMode === 'summary-all') {
      result = getCalcResult(parseRawDataToFloat(summaryData.map(item => item.slice(1))), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    } else if (calcMode === 'summary-single') {
      result = getCalcResult(parseRawDataToFloat(summaryData.map(item => item.slice(1))), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    }
    setResult(result);
    setCalcResult(result);
  }, []);

  React.useEffect(() => {
    if (maxScore.length < 1 || globalInMean.length < 1 || globalLnSD.length < 1) {
      toast.error('One or more static values are empty!', {containerId: 'A', position: toast.POSITION.TOP_RIGHT, className: 'toast-info', autoClose: 5000});
      return;
    }
    let result = '';
    if (calcMode === 'raw') {
      result = getCalcResult(parseRawDataToInt(getSortedData(rawData, rawColumnOrder)), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    } else if (calcMode === 'summary-all') {
      result = getCalcResult(parseRawDataToFloat(summaryData.map(item => item.slice(1))), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    } else if (calcMode === 'summary-single') {
      result = getCalcResult(parseRawDataToFloat(summaryData.map(item => item.slice(1))), calcMode, values.confidenceLevel, maxScore, globalInMean, globalLnSD);
    }
    setResult(result);
    setCalcResult(result);
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
            <MenuItem value={0.99}>99%</MenuItem>
            <MenuItem value={0.95}>95%</MenuItem>
            <MenuItem value={0.9}>90%</MenuItem>
            <MenuItem value={0.85}>85%</MenuItem>
            <MenuItem value={0.8}>80%</MenuItem>
            <MenuItem value={0.75}>75%</MenuItem>
            <MenuItem value={0.5}>50%</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="view-result-body">
        <OverallSupr result={result.overallResults} confLevel={values.confidenceLevel} drawChart={() => drawCharts(result)} />
        {calcMode !== 'summary-single' && <PercentileRanks result={result.percentileRanksBA} drawChart={() => drawCharts(result)} />}
        {calcMode !== 'summary-single' && <RawScores result={result.rawScoresBA} drawChart={() => drawCharts(result)} />}
        {calcMode !== 'summary-single' && <SusEquivalents result={result.susEquivalents} drawChart={() => drawCharts(result)} />}
        {calcMode !== 'summary-single' && calcMode !== 'summary-all' && <IndividualRawValues result={result.individualRawValuesBA} />}
        {calcMode !== 'summary-single' && calcMode !== 'summary-all' && <RawMeans result={result.rawMeansByQ} drawChart={() => drawCharts(result)} />}
        <div>
          <span>Error bars represent {values.confidenceLevel*100}% confidence intervals.</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rawData: state.Calc.rawData,
  rawColumnOrder: state.Calc.rawColumnOrder,
  calcMode: state.Calc.calcMode,
  summaryData: state.Calc.summaryData,
  maxScore: state.Calc.maxScore,
  globalInMean: state.Calc.globalInMean,
  globalLnSD: state.Calc.globalLnSD
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCalcResult: (data) => calcActions.setCalcResult(data)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ViewResults);
