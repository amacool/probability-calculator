import actions from './actions';

const initState = {
  path: 'home'
};

export default function pathReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.SET_PATH:
      return {
        path: payload
      };

    default:
      return state;
  }
}
