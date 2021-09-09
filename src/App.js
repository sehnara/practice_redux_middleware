import "./App.css"
import CounterContainer from "./components/CounterContainer"
import PostContainer from "./components/PostContainer"
import { Route, Switch } from "react-router-dom"
import PContainer from "./components/PContainer"

function App() {
  return (
    <div className="App">
      <CounterContainer />
      <Switch>
        <Route exact path="/">
          <PostContainer />
        </Route>
        <Route path="/post/:id">
          <PContainer />
        </Route>
      </Switch>
    </div>
  )
}

export default App
