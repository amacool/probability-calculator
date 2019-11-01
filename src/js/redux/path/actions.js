const pathActions = {
  SET_PATH: 'SET_PATH',
  GET_PATH: 'GET_PATH',

  setPath: (data) => ({ type: pathActions.SET_PATH, payload: data }),
  getPath: (data) => ({ type: pathActions.GET_PATH })
};

export default pathActions;
