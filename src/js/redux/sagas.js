import { all } from 'redux-saga/effects';
import pathSagas from './path/saga';

export default function* rootSaga(getState) {
	yield all([pathSagas()]);
}
