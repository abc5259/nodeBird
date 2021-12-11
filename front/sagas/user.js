import { all, fork, call, delay, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "../reducers/user";

//이부분은 제너레이터 아니다.
// 서버 요청 부분
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    console.log("saga Login");
    // const result = yield call(loginAPI, action.data); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      //put은 dispatch라고 생각하면 된다.
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function* logOut() {
  try {
    //const result = yield call(logoutAPI); //call fork 차이 fork는 비동기 call은 동기
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      //put은 dispatch라고 생각하면 된다.
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpApi(data) {
  return axios.post("/api/logout");
}

function* signUp(action) {
  try {
    // const result = yield call(signUpApi,data )
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function followAPI(data) {
  return axios.post("/api/logout");
}

function* follow(action) {
  try {
    // const result = yield call(followAPI,data )
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.post("/api/logout");
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI,data )
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  //take는 LOG_IN_REQUES이라는 액션이 실행될때까지 기다리겠다 라는 뜻 (동기)
  //LOG_IN_REQUES이라는 액션이 실행되면 두번째 argument가 실행된다.
  //일회용 딱 한번만 실행된다.
  //takeEvery는 비동기
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn), //fork는 인자에 들어가있는 함수를 실행시킨다.
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
