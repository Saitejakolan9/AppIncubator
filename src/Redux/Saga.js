import {  put,takeLatest,fork} from 'redux-saga/effects';
import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_ERROR } from "./Actions";
import request from "../Axios/axios";

function* getUniversities() {
  try {
    let res = yield request.get("/search?country=sri+lanka").then((res) => {
      return res;
    });
    yield put({ type: GET_DATA_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: GET_DATA_ERROR });
  }
}

function* actionWatcher() {
  yield takeLatest(GET_DATA, getUniversities);
}

export default actionWatcher;

export const universitiessaga = [
    // fork(actionWatcher),
    fork(actionWatcher)
  ]
