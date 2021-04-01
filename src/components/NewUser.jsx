import React from "react";
import { useForm } from "react-hook-form";
import "./Authentication.css";

export const NewUser = ({ app, Link }) => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = async (values) => {
    console.log(values);
    const email = values.email;
    const password = values.password;
    await app.emailPasswordAuth.registerUser(email, password);
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
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              name="password2"
              placeholder="password"
              title="Enter your password"
              required
              ref={register}
            />
            <div className="submit-button">
              <button>Create User</button>
            </div>
          </form>
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
