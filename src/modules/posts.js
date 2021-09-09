import * as postsAPI from "../api/posts"
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from "../lib/asyncUtils"
import { call, getContext, put, takeEvery } from "redux-saga/effects"

// ACTION TYPE
const GET_POSTS = "posts/GET_POSTS"
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS"
const GET_POSTS_ERROR = "posts/GET_POSTS/ERROR"

const GET_POST = "post/GET_POST"
const GET_POST_SUCCESS = "post/GET_POST_SUCCESS"
const GET_POST_ERROR = "post/GET_POST_ERROR"

const CLEAR_POST = "post/CLEAR_POST"
const GO_TO_HOME = "post/GO_TO_HOME"

// Redux Thunk
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts)
export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPost)
export const clearPost = () => ({ type: CLEAR_POST })
// export const goToHome =
//   () =>
//   (dispatch, getState, { history }) => {
//     history.push("/")
//   }
export const goToHome = () => ({ type: GO_TO_HOME })
function* gotoHome() {
  const history = yield getContext("history")
  history.push("/")
}

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts()) // call 쓰면 특정 함수 호출하고 리턴까지 기다린다.
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    })
  } catch (error) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: error,
      error: true,
    })
  }
}
function* getPostSaga(action) {
  const param = action.payload
  const id = action.meta
  try {
    const post = yield call(postsAPI.getPost, param) // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    })
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: e,
      meta: id,
    })
  }
}

// saga 합치기
export function* postsSaga() {
  yield takeEvery([GET_POSTS], getPostsSaga)
  yield takeEvery([GET_POST], getPostSaga)
  yield takeEvery([GO_TO_HOME], gotoHome)
}

// initial Value
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
}

// Reducer
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, "post", true)(state, action)
    // case CLEAR_POST:
    //   return {
    //     ...state,
    //     post: reducerUtils.initial(),
    //   }
    default:
      return state
  }
}
