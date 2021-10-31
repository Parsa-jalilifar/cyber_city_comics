import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home/home";

function App(props) {
  const id = props.myPropsObject;
  const url = "/home/" + id;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/home/:id"
            render={(props) => <Home lastId={id} {...props} />}
          />
          <Redirect from="/" to={url} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
