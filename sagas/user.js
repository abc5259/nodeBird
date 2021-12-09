import { all, fork, delay, takeLatest, put } from "redux-saga/effects";
import axios from "axios";

//이부분은 제너레이터 아니다.
// 서버 요청 부분
function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* login(action) {
  try {
    console.log("saga Login");
    // const result = yield call(loginAPI, action.data); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    yield put({
      //put은 dispatch라고 생각하면 된다.
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post("/api/logout");
}

function* logout() {
  try {
    //const result = yield call(logoutAPI); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
    });
  } catch (err) {
    yield put({
      //put은 dispatch라고 생각하면 된다.
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}
function* watchLogin() {
  //take는 LOG_IN_REQUES이라는 액션이 실행될때까지 기다리겠다 라는 뜻 (동기)
  //LOG_IN_REQUES이라는 액션이 실행되면 두번째 argument가 실행된다.
  //일회용 딱 한번만 실행된다.
  //takeEvery는 비동기
  console.log("takeLatest");
  yield takeLatest("LOG_IN_REQUEST", login);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logout);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin), //fork는 인자에 들어가있는 함수를 실행시킨다.
    fork(watchLogOut),
  ]);
}
