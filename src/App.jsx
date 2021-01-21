import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import {Users} from './pages/Users';
import {Map} from './pages/Map';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/map">Map</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
             renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/map">
              <Map/>
            </Route>
            <Route path="/about">
              About
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
