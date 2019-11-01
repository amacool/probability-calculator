const calcActions = {
  UPDATE_RAW_DATA: 'UPDATE_RAW_DATA',
  CLEAR_RAW_DATA: 'CLEAR_RAW_DATA',

  updateRawData: (data) => ({ type: calcActions.UPDATE_RAW_DATA, payload: data }),
  clearRawData: (data) => ({ type: calcActions.CLEAR_RAW_DATA })
};

export default calcActions;
