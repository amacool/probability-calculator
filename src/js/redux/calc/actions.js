const calcActions = {
  UPDATE_RAW_DATA: 'UPDATE_RAW_DATA',
  CLEAR_RAW_DATA: 'CLEAR_RAW_DATA',
  UPDATE_COLUMN_ORDER: 'UPDATE_COLUMN_ORDER',
  UPDATE_SUMMARY_DATA: 'UPDATE_SUMMARY_DATA',
  CLEAR_SUMMARY_DATA: 'CLEAR_SUMMARY_DATA',
  SET_CALC_MODE: 'SET_CALC_MODE',
  SET_CALC_RESULT: 'SET_CALC_RESULT',
  UPDATE_WEBSITE_DATA: 'UPDATE_WEBSITE_DATA',
  GET_CONSTANTS_DATA: 'GET_CONSTANTS_DATA',
  SET_CONSTANTS_DATA: 'SET_CONSTANTS_DATA',

  updateRawData: (data) => ({ type: calcActions.UPDATE_RAW_DATA, payload: data }),
  updateColumnOrder: (data) => ({ type: calcActions.UPDATE_COLUMN_ORDER, payload: data }),
  clearRawData: () => ({ type: calcActions.CLEAR_RAW_DATA }),

  updateSummaryData: (data) => ({ type: calcActions.UPDATE_SUMMARY_DATA, payload: data }),
  clearSummaryData: () => ({ type: calcActions.CLEAR_SUMMARY_DATA }),

  updateWebsiteData: (data) => ({ type: calcActions.UPDATE_WEBSITE_DATA, payload: data }),

  setCalcMode: (mode) => ({ type: calcActions.SET_CALC_MODE, payload: mode }),
  setCalcResult: (data) => ({ type: calcActions.SET_CALC_RESULT, payload: data }),

  setConstantsData: (data) => ({ type: calcActions.SET_CONSTANTS_DATA, payload: data }),
  getConstantsData: () => ({ type: calcActions.GET_CONSTANTS_DATA }),
};

export default calcActions;
