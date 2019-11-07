const calcActions = {
  UPDATE_RAW_DATA: 'UPDATE_RAW_DATA',
  CLEAR_RAW_DATA: 'CLEAR_RAW_DATA',
  UPDATE_COLUMN_ORDER: 'UPDATE_COLUMN_ORDER',
  UPDATE_SUMMARY_DATA: 'UPDATE_SUMMARY_DATA',
  CLEAR_SUMMARY_DATA: 'CLEAR_SUMMARY_DATA',

  updateRawData: (data) => ({ type: calcActions.UPDATE_RAW_DATA, payload: data }),
  updateColumnOrder: (data) => ({ type: calcActions.UPDATE_COLUMN_ORDER, payload: data }),
  clearRawData: () => ({ type: calcActions.CLEAR_RAW_DATA }),

  updateSummaryData: (data) => ({ type: calcActions.UPDATE_SUMMARY_DATA, payload: data }),
  clearSummaryData: () => ({ type: calcActions.CLEAR_SUMMARY_DATA })
};

export default calcActions;
