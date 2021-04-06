import React from "react";
import { useForm } from "react-hook-form";
import "./Authentication.css";
import { FormErrors } from "./FormErrors";

export const NewUser = ({ app, Link }) => {
  const [error, setError] = React.useState("");
  const { handleSubmit, register, getValues, errors } = useForm();
  console.log("Form error:", errors);
  const onSubmit = async (values) => {
    console.log(values);
    const email = values.email;
    const password = values.password;
    try {
      await app.emailPasswordAuth.registerUser(email, password);
    } catch (ex) {
      console.error({ ex });
      setError(ex.error);
    }
  };

  return (
    <div className="auth-container">
      <div>
        <div className="auth-page">
          <h1>Create New User</h1>
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
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="password"
              title="Enter your password"
              required
              ref={register({
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    console.log("Validate:", password, value);
                    return password === value || "Passwords should match!";
                  },
                },
              })}
            />
            <div className="submit-button">
              <button>Create User</button>
            </div>
          </form>
          <div className="auth-error">
            {error}
            <FormErrors errors={errors} />
          </div>
        </div>
        <div className="auth-nav">
          <Link className="user-link" to="/">
            Already have a login?
          </Link>
        </div>
      </div>
    </div>
  );
};
