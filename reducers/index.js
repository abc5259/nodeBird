const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpdata: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = data => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = data => {
  return {
    type: "LOG_OUT",
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case "LOG_OUT":
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: {},
        },
      };
  }
};

export default rootReducer;
