import actions from './actions';
import { getFormatedRawData, parseRawDataToInt } from "../../helper";

const rawData = [
  ['1', '2', '3', '4', '4', '5', '6', '7'],
  ['4', '6', '5', '4', '5', '2', '4', '5'],
  ['5', '5', '5', '5', '5', '5', '5', '5'],
];

const initState = {
  rawData: rawData
};

export default function calcReducer(state = initState, { type, payload }) {
  switch (type) {
    case actions.UPDATE_RAW_DATA:
      return {
        rawData: payload
      }

    case actions.CLEAR_RAW_DATA:
      return {
        rawData: null
      }

    default:
      return state;
  }
}
