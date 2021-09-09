import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { applyMiddleware, createStore } from "redux"
import rootReducer, { rootSaga } from "./modules"
import { Provider } from "react-redux"
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { BrowserRouter as Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import createSagaMiddleware from "@redux-saga/core"

const customHistory = createBrowserHistory({ forceRefresh: true }) //forceRefresh : true 해야 history 이용가능
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
}) // --------------------- saga 4
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      // 2. Thunk-Redux에서 제공하는 함수를 customHistory에 적용시키기 위한 것
      thunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware,
      logger
    )
  )
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    {/* 1. BrowserRouter와 customHistory 연결 */}
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
