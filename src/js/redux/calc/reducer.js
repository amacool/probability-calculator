import actions from './actions';

const rawData = [
  ['1', '2', '3', '4', '4', '5', '5', '5'],
  ['4', '5', '5', '4', '5', '2', '4', '5'],
  ['5', '5', '5', '5', '5', '5', '5', '5'],
];
const rawColumnOrder = [0, 1, 2, 3, 4, 5, 6, 7];

const initState = {
  rawData,
  rawColumnOrder
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

    default:
      return state;
  }
}
