import { maxScore, globalInMean, globalLnSD } from "./constants";
import { calcNPS, getMean, getSD, getND, getTINV, zinv } from "./functions";
import {
  getArrSum,
  getArrAvg,
  getNonBlankArr,
  getNonBlankCount,
  getProFormat
} from "../helper";

const get_ci_pr = (N, studySD, rawMean, rawMeanSUPRQ, maxScore, globalInMean, globalLnSD, alpha, acc) => {
  const SE = studySD / Math.sqrt(N);
  const t = getTINV(N - 1, alpha);
  const margin = SE * t;
  const studyMean = rawMean > maxScore ? 4.999999999 : rawMeanSUPRQ;
  const studyMeanRef = Math.log(maxScore - studyMean);
  const low = studyMean - margin < 1 ? 1 : studyMean - margin;
  const high = studyMean + margin > maxScore ? maxScore : studyMean + margin;
  const gZReflect = (studyMeanRef - globalInMean) / globalLnSD;
  const gProReflect = getND(gZReflect).toFixed(3);

  const lowLnReflect = Math.log(maxScore - low);
  const lZReflect = (lowLnReflect - globalInMean) / globalLnSD;
  const lProReflect = getND(lZReflect).toFixed(3);

  const highLnReflect = Math.log(maxScore - high);
  const hZReflect = (highLnReflect - globalInMean) / globalLnSD;
  let hProReflect = high === maxScore ? 0.00000001 : getND(hZReflect);
  hProReflect = hProReflect.toFixed(acc);

  const ciLowPro = (1 - lProReflect).toFixed(3);
  const prMean = (1 - gProReflect).toFixed(3);
  const ciHighPro = (1 - hProReflect).toFixed(3);
  const ciLowVal = rawMean - margin;
  const ciHighVal = rawMean + margin;

  return {
    prMean,
    ciLowPro,
    ciHighPro,
    ciLowVal,
    ciHighVal
  };
};

export const getCalcResult = (rawData, confLevel = 0.9) => {
  // definition of calculation results
  let percentileRanksBA = [];
  let rawScoresBA = [];
  let susEquivalents = {};
  let overallResults = {
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
  };
  let individualRawValuesBA = [];
  let rawMeansByQ = [];

  // definition of constants
  const acc = 1;
  const N = 8;
  const DF = 7;
  const alpha = 1 - confLevel;
  const  z =  zinv(alpha/2);
  const dataCount = rawData.length;
  let subScales = {
    suprQ: [],
    usability: [],
    trust: [],
    loyalty: [],
    appearance: []
  };
  let qColumnData = [...Array(8)].map(item => []);
  let rowSUM = [];

  // get sub-scales
  rawData.forEach((row, index) => {
    // supr-q
    if (row[0] && row[1] && row[2] && row[3] && row[4] && row[5] && row[6] && row[7]) {
      subScales.suprQ.push((row[0] + row[1] + row[2] + row[3] + row[4] / 2 + row[5] + row[6] + row[7])/8);
    } else {
      subScales.suprQ.push('');
    }
    // usability
    if (row[0] && row[1]) {
      subScales.usability.push((row[0] + row[1]) / 2);
    } else {
      subScales.usability.push('');
    }
    // trust
    if (row[2] && row[3]) {
      subScales.trust.push((row[2] + row[3]) / 2);
    } else {
      subScales.trust.push('');
    }
    // loyalty
    if (row[4] && row[5]) {
      subScales.loyalty.push((row[4]/2 + row[5]) / 2);
    } else {
      subScales.loyalty.push('');
    }
    // appearance
    if (row[6] && row[7]) {
      subScales.appearance.push((row[6] + row[7]) / 2);
    } else {
      subScales.appearance.push('');
    }

    // get question column Data
    row.forEach((item, index) => qColumnData[index].push(item));

    // get RowSUM
    if (getNonBlankCount(row) === 8) {
      const rowSumVal = getArrSum(row);
      rowSUM.push(rowSumVal);
      // const testSdVal = getSD(rowSumVal);
      // // testSD.push(testSdVal);
      // const testVarVal = testSdVal * testSdVal;
      // testVar.push(testVarVal);
    } else {
      testVar.push('');
    }
  });

  // get non-blank, SD, RawScore
  const nonBlank = [
    getNonBlankCount(subScales.suprQ),
    getNonBlankCount(subScales.usability),
    getNonBlankCount(subScales.trust),
    getNonBlankCount(subScales.loyalty),
    getNonBlankCount(subScales.appearance)
  ];
  const stdDevBA = [  // SD in excel
    getSD(subScales.suprQ),
    getSD(subScales.usability),
    getSD(subScales.trust),
    getSD(subScales.loyalty),
    getSD(subScales.appearance)
  ];
  const rawMeanBA = [  // mean in excel
    getArrAvg(getNonBlankArr(subScales.suprQ)),
    getArrAvg(getNonBlankArr(subScales.usability)),
    getArrAvg(getNonBlankArr(subScales.trust)),
    getArrAvg(getNonBlankArr(subScales.loyalty)),
    getArrAvg(getNonBlankArr(subScales.appearance))
  ];

  // get CronbachAlpha
  const stdDevQ = qColumnData.map((item) => getSD(item));
  const rawMeanQ = qColumnData.map((item) => getArrAvg(getNonBlankArr(item)));

  const testSD = getSD(rowSUM);
  const testVar = testSD * testSD;
  const sumVar = getArrSum(stdDevQ.map((item) => item * item));
  const cronbachAlpha = N / DF * (1 - (sumVar / testVar));
  const internalReliability = cronbachAlpha > 0.7 ? 'Good' : 'Poor';
  console.log('row sum: ', rowSUM);
  console.log('test sd: ', testSD);
  console.log('test var: ', testVar);
  console.log('sum var: ', sumVar);
  console.log('cronbach alpha: ', cronbachAlpha);
  console.log('internalReliability: ', internalReliability);

  // get Percentile Ranks by Attribute, get Raw Scores by Attribute
  // G - Values
  let studyMeanArr = [];
  let studyMeanRefArr = [];
  let gZReflectArr = [];
  let gProReflectArr = [];
  let prSuprQ_meanArr = [];
  maxScore.forEach((score, index) => {
    const {
      prMean,
      ciLowPro,
      ciLowVal,
      ciHighPro,
      ciHighVal
    } = get_ci_pr(N, stdDevBA[index], rawMeanBA[index], rawMeanBA[0], maxScore[index], globalInMean[index], globalLnSD[index], 1 - confLevel, acc);

    index < 5 && percentileRanksBA.push({
      mean: getProFormat(prMean, acc),
      low: getProFormat(ciLowPro, acc),
      high: getProFormat(ciHighPro, acc),
      stdDev: getProFormat(stdDevBA[index], acc),
      sampleSize: dataCount
    });
    index < 5 && rawScoresBA.push({
      mean: rawMeanBA[index].toFixed(2),
      low: ciLowVal.toFixed(2),
      high: ciHighVal.toFixed(2),
      stdDev: stdDevBA[index].toFixed(1),
      sampleSize: dataCount
    });
  });
  const { npsMean, npsLow, npsHigh } = calcNPS(qColumnData[4], z);
  percentileRanksBA.push({
    mean: getProFormat(npsMean, acc),
    low: getProFormat(npsLow, acc),
    high: getProFormat(npsHigh, acc),
    stdDev: '?',
    sampleSize: dataCount
  });
  rawScoresBA.push({
    mean: '?',
    low: '?',
    high: '?',
    stdDev: '?',
    sampleSize: dataCount
  });
  // console.log(npsMean, npsLow, npsHigh);

  // get confidence interval by questions
  // stdDevQ, rawMeanQ
  // index < 5 && rawMeansByQ.push({
  //   mean: rawMeanBA[index].toFixed(2),
  //   low: ciLowVal.toFixed(2),
  //   high: ciHighVal.toFixed(2),
  //   stdDev: stdDevBA[index].toFixed(1),
  //   sampleSize: dataCount
  // });

  // get Individual Raw Values by Attribute
  subScales.suprQ.forEach((item, index) => {
    individualRawValuesBA.push([
      subScales.suprQ[index],
      subScales.usability[index],
      subScales.trust[index],
      subScales.loyalty[index],
      subScales.appearance[index]
    ]);
  });

  // get Raw Means by Questionnaire Item
  stdDevQ.forEach((item, index) => {
    rawMeansByQ.push({
      mean: rawMeanQ[index].toFixed(2),
      low: '?',
      high: '?',
      stdDev: stdDevQ[index].toFixed(1),
      sampleSize: dataCount
    });
  });

  // get Overall SUPR-Q Results
  overallResults = {
    percentileRank: {
      percentileRank: percentileRanksBA[0].mean,
      ciLow: percentileRanksBA[0].low,
      ciHigh: percentileRanksBA[0].high,
      marginOfError: '-'
    },
    rawScore: {
      rawScore: rawScoresBA[0].mean,
      ciLow: rawScoresBA[0].low,
      ciHigh: rawScoresBA[0].high,
      stdDev: rawScoresBA[0].stdDev,
      sampleSize: rawScoresBA[0].sampleSize,
      cronbachAlpha: cronbachAlpha.toFixed(3),
      internalReliability: internalReliability
    }
  };

  return {
    percentileRanksBA,
    rawScoresBA,
    individualRawValuesBA,
    rawMeansByQ,
    overallResults
  };
};
