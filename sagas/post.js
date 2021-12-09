import { all, fork, put, takeLatest, delay } from "redux-saga/effects";
import axios from "axios";

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
function* watchAddPost() {
  // 마지막 액션만 처리해줌
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
