import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import { Users } from "./pages/Users";
import { Map } from "./pages/Map";
import { MapList } from "./pages/MapList";

function App({ logOut, user }) {
  return (
    <div className="App">
      <Router>
        <div className="app-body">
          <div className="header">Header</div>
          <div className="navigation">
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
                <li>
                  <Link to="/maplist">Map List</Link>
                </li>
                <li>
                  <Link onClick={logOut} to="#">
                    Log Out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="app-page">
            <Switch>
              <Route path="/map">
                <Map user={user} />
              </Route>
              <Route path="/about">About</Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/maplist">
                <MapList />
              </Route>
              <Route path="/">Home</Route>
            </Switch>
          </div>
          <div className="footer">Footer</div>
        </div>
      </Router>
    </div>
  );
}

export default App;
