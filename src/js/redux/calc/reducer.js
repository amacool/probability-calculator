import actions from './actions';

const rawData = [
  ['1', '2', '3', '4', '4', '5', '5', '5'],
  ['4', '5', '5', '4', '5', '2', '4', '5'],
  ['5', '5', '5', '5', '5', '5', '5', '5'],
];
const rawColumnOrder = [0, 1, 2, 3, 4, 5, 6, 7];

const summaryData = [
  ['Raw Score (Mean)', 4.23, 4.33, 4.33, 3.42, 4.83, 5],
  ['Standard Deviation', 0.4, 0.8, 0.8, 0.4, 0.3, 0.5],
  ['Sample Size', 3, 3, 3, 3, 3, 3]
];
const emptySummaryData = [
  ['Raw Score (Mean)', '', '', '', '', '', ''],
  ['Standard Deviation', '', '', '', '', '', ''],
  ['Sample Size', '', '', '', '', '', '']
];

const websiteData = [
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['YouTube', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Amazon', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
  ['Hyatt', '01/01/2020', 'Usability', 'Entertainment', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%', '99.8%'],
];

const initState = {
  rawData,
  rawColumnOrder,
  summaryData,
  websiteData,
  calcMode: 'raw',
  calcResult: null
};

export default function calcReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.UPDATE_RAW_DATA:
      return {
        ...state,
        rawData: payload
      };

    case actions.UPDATE_COLUMN_ORDER:
      return {
        ...state,
        rawColumnOrder: payload
      };

    case actions.CLEAR_RAW_DATA:
      return {
        ...state,
        rawData: null
      };

    case actions.UPDATE_SUMMARY_DATA:
      return {
        ...state,
        summaryData: payload
      };

    case actions.CLEAR_SUMMARY_DATA:
      return {
        ...state,
        summaryData: emptySummaryData
      };

    case actions.SET_CALC_MODE:
      return {
        ...state,
        calcMode: payload
      };

    case actions.SET_CALC_RESULT:
      return {
        ...state,
        calcResult: payload
      };

    case actions.UPDATE_WEBSITE_DATA:
      return {
        ...state,
        websiteData: payload
      };

    default:
      return state;
  }
}
