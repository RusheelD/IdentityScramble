import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.css";

//components
import HomePage from "./general_components/HomePage";
import Lobby from "./general_components/Lobby";
import background from "../src/images/background.png";

function App() {
  var sectionStyle = {
    backgroundImage: `url(${background})`,
  };

  return (
    <Router>
      <div className="container-fluid min-vh-100 view" style={{ backgroundColor: '#222222' }}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/:id/host">
            <Lobby />
          </Route>
          <Route exact path="/:id/player">
            <Lobby />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

const AnotherPage = () => {
  const history = useHistory();

  const ReturnToHomePage = () => {
    history.push("/");
  };

  return (
    <div>
      <h2>Another</h2>
      <button className="btn btn-dark" onClick={() => ReturnToHomePage()}>
        Hello
      </button>
    </div>
  );
};

const BoredPage = () => {
  return <h2>Bored</h2>;
};

export default App;
