import { delay, put, takeEvery, takeLatest } from "redux-saga/effects"

// Action Type
const INCREASE = "counter/INCREASE"
const DECREASE = "counter/DECREASE"
const INCREASE_ASYNC = "counter/INCREASE_ASYNC"
const DECREASE_ASYNC = "counter/DECREASE_ASYNC"

// Action Creator
export const increase = () => ({
  type: INCREASE,
})
export const decrease = () => ({
  type: DECREASE,
})

// Redux -thunk
export const increaseAsync = () => ({ type: INCREASE_ASYNC })
export const decreaseAsync = () => ({ type: DECREASE_ASYNC })

// Redux -saga ------------------ saga 1
function* increaseSaga() {
  yield delay(1000)
  yield put(increase())
}
function* decreaseSaga() {
  yield delay(1000)
  yield put(decrease())
}
// -------------------------------------

// Redux-saga : monitoring ------- saga 2
export function* counterSaga() {
  yield takeEvery([DECREASE_ASYNC], decreaseSaga)
  yield takeLatest([INCREASE_ASYNC], increaseSaga)
}
// --------------------------------------

// initial State
const initialState = 0

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1
    case DECREASE:
      return state - 1
    default:
      return state
  }
}
