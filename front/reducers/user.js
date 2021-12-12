import produce from "immer";

export const initialState = {
  //logIn
  logInLoading: false, //로그인 시도중
  logInDone: false,
  logInError: false,
  //logOut
  logOutLoading: false, //로그아웃 시도중
  logOutDone: false,
  logOutError: false,
  //signup
  signUpLoading: false, //로그아웃 시도중
  signUpDone: false,
  signUpError: false,
  //nickname
  changeNicknameLoading: false, //닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: false,
  //follow
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: false,
  // unfollow
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: false,
  me: null,
  signUpdata: {},
  loginData: {},
};
//login
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
//logout
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";
//signup
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
//nickname
export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";
//follow
export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
//unfollow
export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = data => ({
  ...data,
  nickname: "JaeHoon",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: "부기초" },
    { nickname: "leejaehoon" },
    { nickname: "newew" },
  ],
  Followers: [
    { nickname: "부기초" },
    { nickname: "leejaehoon" },
    { nickname: "newew" },
  ],
});

export const loginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // LOG IN
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = false;
        draft.logInDone = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        draft.logInDone = false;
        break;
      // LOG OUT
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      // SIGN UP
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      // FOLLOW
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      // UNFOLLOW
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter(
          v => v.id !== action.data
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      // CHANGE NICKNAME
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      // ADD_POST_TO_ME
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // REMOVE_POST_OF_ME
      case REMOVE_POST_OF_ME:
        draft.me.posts = draft.me.Posts.filter(post => post.id !== action.data);
        break;
      default:
        break;
    }
  });
};

export default reducer;