import { all } from 'redux-saga/effects';
import adminAuthSaga from './adminAuthSaga';

export default function* rootSaga() {
  yield all([
    adminAuthSaga(),
  ]);
} 