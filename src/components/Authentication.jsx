import * as Realm from "realm-web";
import { useForm } from "react-hook-form";
import React from "react";
import App from "../App";

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
    return <Login setUser={setUser} />;
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
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" name="email" ref={register} />
        <input type="password" name="password" ref={register} />
        <input type="submit" />
      </form>
    </div>
  );
};
