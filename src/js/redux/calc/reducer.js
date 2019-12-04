import actions from "./actions";
import { params } from "../../../calcParams";

const rawData = [];
const rawColumnOrder = [0, 1, 2, 3, 4, 5, 6, 7];
const emptySummaryData = [
  ['Raw Score (Mean)', '', '', '', '', '', ''],
  ['Standard Deviation', '', '', '', '', '', ''],
  ['Sample Size', '', '', '', '', '', '']
];
const summaryData = emptySummaryData;
const websiteData = params.tWebsiteData;

// Max Score
const maxScore = params.tMaxScore;
// Global In Mean : SUPR-Q	Usability	Trust	Loyalty	App	Raw NPS
const globalInMean = params.tGlobalInMean;
// Global Ln SD : SUPR-Q	Usability	Trust	Loyalty	App	Raw NPS
const globalLnSD = params.tGlobalLnSD;

// version info
const versionInfo = params.versionInfo;
const copyrightInfo = params.copyrightInfo;

const hashedAdminPwd = params.hashedAdminPwd;
const hashedUserPwd = params.hashedUserPwd;
const expirationDate = params.expirationDate * 12321;

const initState = {
  rawData,
  rawColumnOrder,
  summaryData,
  websiteData,
  calcMode: 'raw',
  calcResult: null,
  maxScore,
  globalInMean,
  globalLnSD,
  hashedAdminPwd,
  hashedUserPwd,
  expirationDate,
  isAuthenticated: false,
  versionInfo,
  copyrightInfo
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

    case actions.GET_CONSTANTS_DATA:
      return {
        maxScore: state.maxScore,
        globalInMean: state.globalInMean,
        globalLnSD: state.globalLnSD,
      };

    case actions.SET_CONSTANTS_DATA:
      return {
        ...state,
        maxScore: payload.tMaxScore,
        globalInMean: payload.tGlobalInMean,
        globalLnSD: payload.tGlobalLnSD,
      };

    case actions.SET_AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: payload
      };

    default:
      return state;
  }
}
