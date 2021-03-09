import * as Realm from "realm-web";
import { useForm } from "react-hook-form";

const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
const app = new Realm.App({ id: REALM_APP_ID });

export const Authentication = ({ children }) => {
  if (!app.currentUser) {
    return <Login />;
  }
  return children;
};

export const Login = () => {
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
      window.location.reload();
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

// async function loginEmailPassword(email, password) {
//   // Create an anonymous credential
//   const credentials = Realm.Credentials.emailPassword(email, password);
//   try {
//     // Authenticate the user
//     const user = await app.logIn(credentials);
//     // `App.currentUser` updates to match the logged in user
//     assert(user.id === app.currentUser.id);
//     return user;
//   } catch (err) {
//     console.error("Failed to log in", err);
//   }
// }
