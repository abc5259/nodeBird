import shortid from "shortid";

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "JaeHoon",
      },
      content: "첫번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortid.generate(),
          src: "https://health.chosun.com/site/data/img_dir/2021/07/26/2021072601445_0.jpg",
        },
        {
          id: shortid.generate(),
          src: "https://mimg.segye.com/content/image/2021/06/18/20210618504877.jpg",
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "nero",
          },
          content: "우와 개정판이 나왔군요~",
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "hero",
          },
          content: "얼른  사고싶어용",
        },
      ],
    },
  ],
  imagePaths: [],
  // add post
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  // remove post
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  // add comment
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};
// add post
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
// remove post
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
// add comment
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = data => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = data => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = ({ id, content }) => ({
  id,
  content,
  User: {
    id: 1,
    nickname: "zerocho",
  },
  Images: [],
  Comments: [],
});

const dummyComment = data => ({
  id: shortid.generate(),
  content: data.content,
  User: {
    id: data.userId,
    nickname: "nero",
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostDone: true,
        addPostLoading: false,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter(post => post.id !== action.data),
        removePostDone: true,
        removePostLoading: false,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        post => action.data.postId === post.id
      );
      const post = state.mainPosts[postIndex]; //해당 post찾기
      //comment에 우리가 써준 comment 넣기
      const Comments = [dummyComment(action.data), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, Comments };
      return {
        ...state,
        mainPosts,
        addCommentDone: true,
        addCommentLoading: false,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
