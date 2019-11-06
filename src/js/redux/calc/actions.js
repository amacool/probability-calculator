const calcActions = {
  UPDATE_RAW_DATA: 'UPDATE_RAW_DATA',
  CLEAR_RAW_DATA: 'CLEAR_RAW_DATA',
  UPDATE_COLUMN_ORDER: 'UPDATE_COLUMN_ORDER',

  updateRawData: (data) => ({ type: calcActions.UPDATE_RAW_DATA, payload: data }),
  updateColumnOrder: (data) => ({ type: calcActions.UPDATE_COLUMN_ORDER, payload: data }),
  clearRawData: (data) => ({ type: calcActions.CLEAR_RAW_DATA })
};

export default calcActions;
