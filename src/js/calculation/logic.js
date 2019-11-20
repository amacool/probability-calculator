import {
  calcNPS,
  calcCiForQ,
  getSD,
  getND,
  getTINV,
  zinv
} from "./functions";
import {
  getArrSum,
  getArrAvg,
  getNonBlankArr,
  getNonBlankCount,
  getProFormat
} from "../helper";

const get_ci_pr = (N, studySD, rawMean, rawMeanSUPRQ, maxScore, globalInMean, globalLnSD, confLevel, acc) => {
  const SE = studySD / Math.sqrt(N);
  const t = getTINV(confLevel, N - 1);
  const margin = SE * t;
  const marginOfError = margin / rawMean;
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
    ciHighVal,
    marginOfError
  };
};

export const getRawMeans = (data) => {
  let stdDevQ = [];
  let rawMeanQ = [];
  let rawMeansByQ = [];
  let qColumnData = [...Array(8)].map(() => []);

  data.forEach((row) => {
    // get question column Data
    row.forEach((item, index) => qColumnData[index].push(item));
  });

  stdDevQ = qColumnData.map((item) => getSD(getNonBlankArr(item), 2));
  rawMeanQ = qColumnData.map((item) => getArrAvg(getNonBlankArr(item)));
  // get Raw Means by Questionnaire Item
  stdDevQ.forEach((item, index) => {
    rawMeansByQ.push({
      mean: rawMeanQ[index].toFixed(2),
      stdDev: stdDevQ[index].toFixed(2),
      sampleSize: getNonBlankCount(qColumnData[index])
    });
  });

  return rawMeansByQ;
};

export const getCalcResult = (data, calcMode, confLevel = 0.9, maxScore, globalInMean, globalLnSD) => {
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
  const N = data.length;
  const DF = N - 1;
  const alpha = 1 - confLevel;
  const  z =  zinv(alpha/2);
  const dataCount = data.length;
  let subScales = {
    suprQ: [],
    usability: [],
    trust: [],
    loyalty: [],
    appearance: []
  };
  let qColumnData = [...Array(8)].map(() => []);
  let rowSUM = [];

  // get sub-scales
  if (calcMode === "raw" || calcMode === "raw-means") {
    data.forEach((row) => {
      // supr-q
      if (row[0] && row[1] && row[2] && row[3] && row[4] && row[5] && row[6] && row[7]) {
        subScales.suprQ.push(parseFloat(((row[0] + row[1] + row[2] + row[3] + row[4] / 2 + row[5] + row[6] + row[7]) / 8).toFixed(2)));
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
        subScales.loyalty.push((row[4] / 2 + row[5]) / 2);
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
      }
    });
  } else if (calcMode === "summary-all") {
    data.forEach((item, index) => {
      subScales.suprQ.push(data[index][0]);
      subScales.usability.push(data[index][1]);
      subScales.trust.push(data[index][2]);
      subScales.loyalty.push(data[index][3]);
      subScales.appearance.push(data[index][4]);
    });
  }
  // get non-blank, SD, RawScore
  const stdDevBA = subScales.suprQ.length > 0 ? [  // SD in excel
    getSD(subScales.suprQ, 1),
    getSD(subScales.usability, 1),
    getSD(subScales.trust, 1),
    getSD(subScales.loyalty, 1),
    getSD(subScales.appearance, 1)
  ] : [];
  const rawMeanBA = subScales.suprQ.length > 0 ? [  // mean in excel
    getArrAvg(getNonBlankArr(subScales.suprQ)),
    getArrAvg(getNonBlankArr(subScales.usability)),
    getArrAvg(getNonBlankArr(subScales.trust)),
    getArrAvg(getNonBlankArr(subScales.loyalty)),
    getArrAvg(getNonBlankArr(subScales.appearance))
  ] : [];

  // get CronbachAlpha
  let stdDevQ = [];
  let rawMeanQ = [];
  let testSD;
  let testVar;
  let sumVar;
  let cronbachAlpha = '';
  let internalReliability = '';
  if (calcMode === "raw" || calcMode === "raw-means") {
    stdDevQ = qColumnData.map((item) => getSD(getNonBlankArr(item), 2));
    rawMeanQ = qColumnData.map((item) => getArrAvg(getNonBlankArr(item)));
    testSD = getSD(rowSUM, 2);
    testVar = testSD * testSD;
    sumVar = getArrSum(stdDevQ.map((item) => item * item));
    cronbachAlpha = N / DF * (1 - (sumVar / testVar));
    internalReliability = isNaN(cronbachAlpha) ? '' : cronbachAlpha > 0.7 ? 'Good' : 'Poor';
  }

  // get Percentile Ranks by Attribute, get Raw Scores by Attribute
  // G - Values
  let suprqMarginOfError = '';
  calcMode !== "summary-single" && calcMode !== "raw-means" && maxScore.forEach((score, index) => {
    const {
      prMean,
      ciLowPro,
      ciLowVal,
      ciHighPro,
      ciHighVal,
      marginOfError
    } = get_ci_pr(N, stdDevBA[index], rawMeanBA[index], rawMeanBA[0], maxScore[index], globalInMean[index], globalLnSD[index], confLevel, acc);

    if (index === 0) {
      suprqMarginOfError = marginOfError;
    }

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

  // get NPS values
  const { npsMean, npsLow, npsHigh, npsProLow, npsProHigh } = calcNPS(qColumnData[4], z, globalInMean, globalLnSD);
  percentileRanksBA.push({
    mean: '-',
    low: getProFormat(npsProLow, acc),
    high: getProFormat(npsProHigh, acc),
    stdDev: '-',
    sampleSize: dataCount
  });
  rawScoresBA.push({
    mean: npsMean.toFixed(2),
    low: npsLow.toFixed(2),
    high: npsHigh.toFixed(2),
    stdDev: '-',
    sampleSize: dataCount
  });

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
    // get confidence interval by questions
    const { highq, lowq } = calcCiForQ(qColumnData[index], confLevel);

    rawMeansByQ.push({
      mean: rawMeanQ[index].toFixed(2),
      low: lowq.toFixed(2),
      high: highq.toFixed(2),
      stdDev: stdDevQ[index].toFixed(1),
      sampleSize: getNonBlankCount(qColumnData[index])
    });
  });

  if (calcMode === "raw-means") {
    return rawMeansByQ;
  }

  // get Overall SUPR-Q Results
  overallResults = {
    percentileRank: {
      percentileRank: percentileRanksBA[0].mean,
      ciLow: percentileRanksBA[0].low,
      ciHigh: percentileRanksBA[0].high,
      marginOfError: getProFormat(suprqMarginOfError, acc)
    },
    rawScore: {
      rawScore: rawScoresBA[0].mean,
      ciLow: rawScoresBA[0].low,
      ciHigh: rawScoresBA[0].high,
      stdDev: rawScoresBA[0].stdDev,
      sampleSize: rawScoresBA[0].sampleSize,
      cronbachAlpha: cronbachAlpha && cronbachAlpha.toFixed(3),
      internalReliability: internalReliability
    }
  };

  if (calcMode === "summary-single") {
    overallResults.rawScore.rawScore = data[0][0];
    overallResults.rawScore.stdDev = data[1][0];
    overallResults.rawScore.sampleSize = data[2][0];

    return {
      overallResults
    };
  }

  // get SUS Equivalents
  const susGlobalLnSD = globalLnSD[6];
  const susMaxScore = maxScore[6];
  // const susEquivalent = -13.6 + 22*rawScoresBA[1].mean;
  const susEquivalent = -2.279 + 19.2048 * rawMeanQ[0];
  const susStudyMeanRef = Math.log(susMaxScore - susEquivalent);
  const susGlobalInMean = Math.log(susMaxScore - 68);
  const susZReflect = (susStudyMeanRef - susGlobalInMean)/susGlobalLnSD;
  const susPercentileRank = 1 - getND(susZReflect);

  susEquivalents = {
    suprQ: [percentileRanksBA[0].mean, rawScoresBA[0].mean],
    usability: [percentileRanksBA[1].mean, rawScoresBA[1].mean],
    susEquivalent: [getProFormat(susPercentileRank, acc), susEquivalent.toFixed(2)]
  };

  return {
    percentileRanksBA,
    rawScoresBA,
    individualRawValuesBA,
    rawMeansByQ,
    overallResults,
    susEquivalents
  };
};
