import * as Realm from "realm-web";
import { useForm } from "react-hook-form";
import React from "react";
import App from "../App";
import "./Authentication.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { NewUser } from "./NewUser";

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
const app = new Realm.App({ id: REALM_APP_ID });

export const Authentication = () => {
  const [user, setUser] = React.useState(app.currentUser);

  const logOut = () => {
    if (user) {
      user.logOut();
      setUser(undefined);
    }
  };

  if (!user) {
    return (
      <Router>
        <Switch>
          <Route path="/new-user">
            <NewUser app={app} Link={Link} />
          </Route>
          <Route path="/">
            <Login setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    );
  }
  return <App logOut={logOut} />;
};

export const Login = ({ setUser }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    console.log(values);
    const credentials = Realm.Credentials.emailPassword(
      values.email,
      values.password
    );
    try {
      const user = await app.logIn(credentials);
      console.log("User:", user);
      setUser(user);
    } catch (err) {
      console.log("Login Error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div>
        <div className="auth-page">
          <h1>Mappity McMap Face</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              placeholder="example@domain.com"
              title="Enter your email address"
              required
              ref={register}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              title="Enter your password"
              required
              ref={register}
            />
            <div className="submit-button">
              <button>Log In</button>
            </div>
          </form>
        </div>
        <div className="auth-nav">
          <Link className="user-link" to="/new-user">
            Create New User
          </Link>
        </div>
      </div>
    </div>
  );
};
