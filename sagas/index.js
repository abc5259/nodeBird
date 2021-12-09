import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
  yield all([
    //all은 배열안에 들어가 있는것을 동시에(한방에?) 실행시킨다.
    fork(postSaga), //fork는 인자에 들어가있는 함수를 실행시킨다.
    fork(userSaga),
  ]);
}
