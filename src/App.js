import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { useState } from "react";
import LoginContext from "./contexts/LoginContext";

import AgentForm from "./components/AgentForm";
import AgentConfirmDelete from "./components/AgentConfirmDelete";
import Fail from "./components/Fail";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import View from "./components/View";


function App() {

  const [credentials, setCredentials] = useState({
    username: null,
    jwt: null
  });

  const afterAuth = token => {
    const firstDot = token.indexOf(".");
    const secondDot = token.indexOf(".", firstDot + 1);
    const jwtBody = token.substring(firstDot + 1, secondDot);
    const body = JSON.parse(atob(jwtBody));
    setCredentials({
      username: body.sub,
      jwt: token
    });
  }

  const logout = () => setCredentials({ username: null, jwt: null })

  return (
    <div className="container">
      <LoginContext.Provider value={{ ...credentials, afterAuth, logout }}>
      <Router>
        <Nav />

        <Switch>
          
          <Route path={["/edit/:agentId", "/add"]}>
            {credentials.username ? <AgentForm /> : <Redirect path="/login" />}
          </Route>

          <Route path={["/delete/:agentId"]}>
          {credentials.username ? <AgentConfirmDelete /> : <Redirect path="/login" />}
          </Route>

          <Route path={["/view"]}>
          {credentials.username ? <View /> : <Redirect path="/login" />}
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/Fail">
            <Fail/>
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      </LoginContext.Provider>
    </div>
    
  );
}

export default App;

