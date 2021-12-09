import { all, fork, call, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

//이부분은 제너레이터 아니다.
// 서버 요청 부분
function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* login(action) {
  try {
    // const result = yield call(loginAPI, action.data); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
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

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    //const result = yield call(addPostAPI, action.data); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
    });
  } catch (err) {
    yield put({
      //put은 dispatch라고 생각하면 된다.
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  //take는 LOG_IN_REQUES이라는 액션이 실행될때까지 기다리겠다 라는 뜻 (동기)
  //LOG_IN_REQUES이라는 액션이 실행되면 두번째 argument가 실행된다.
  //일회용 딱 한번만 실행된다.
  //takeEvery는 비동기
  yield takeLatest("LOG_IN_REQUEST", login);
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logout);
}

function* watchAddPost() {
  // 마지막 액션만 처리해줌
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([
    //all은 배열안에 들어가 있는것을 동시에(한방에?) 실행시킨다.
    fork(watchLogin), //fork는 인자에 들어가있는 함수를 실행시킨다.
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
