import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Link from "next/link";
import Router from "next/router";

import LoadingSpinner from "../spinner/LoadingSpinner";
import { loginUser } from "../../actions/auth";
import { setCookie } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

import styles from "./SignupComponent.module.css";

const FormWithToasts = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onTouched",
  });
  useEffect(() => {}, []);
  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    let response;

    try {
      response = await loginUser(data);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setCookie(COOKIE_NAME, response.token);
        addToast(`${response.message}`, {
          appearance: "success",
          autoDismiss: true,
        });
        Router.push("/articles");
      }
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const showForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${styles.formLabelGroup}`}>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            name="username"
            ref={register({ required: true, pattern: /^[a-zA-Z0-9_.-]*$/ })}
            autoComplete="off"
            style={errors.username && { border: "1px solid red" }}
          />
          <label htmlFor="username">Username</label>
          <p className={`text-danger ${styles.errors}`}>
            {errors.username?.type === "required" && "Username is required"}
            {errors.username?.type === "pattern" &&
              "Username can only conatin characters numbers and underscores"}
          </p>
        </div>

        <div className={`${styles.formLabelGroup}`}>
          <input
            type="password"
            name="password"
            className={`form-control`}
            id="password"
            placeholder="Minimum 6 characters"
            ref={register({ required: true, minLength: 6 })}
            autoComplete="off"
            style={errors.password && { border: "1px solid red" }}
          />
          <label htmlFor="password">Password</label>
          <p className={`text-danger ${styles.errors}`}>
            {errors.password && "Password must be atleast 6 character long"}
          </p>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`btn btn-lg btn-primary btn-block text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
            disabled={
              Object.keys(formState.touched).length === 0 ||
              Object.keys(errors).length !== 0
            }
          >
            Signin
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner asOverlay />}
      <div className="row no-gutter">
        <div className="col-md-8 col-lg-6">
          <div className={`${styles.login} d-flex align-items-center py-5`}>
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className={`${styles.loginHeading} mb-4 text-center`}>
                    Welcome Back! <br />
                    <br />
                    <h5>To keep connected with us please login</h5>
                  </h3>

                  {showForm()}
                  <div className={`d-flex justify-content-between`}>
                    <p>
                      New User?{" "}
                      <Link href="/signup">
                        <a>Signup</a>
                      </Link>
                    </p>
                    <p>
                      <Link href="/">
                        <a>Back to Main Page</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`d-none d-md-flex col-md-4 col-lg-6 ${styles.bgImagelogin}`}
        ></div>
      </div>
    </div>
  );
};

const SigninComponent = () => {
  return (
    <ToastProvider>
      <FormWithToasts />
    </ToastProvider>
  );
};

export default SigninComponent;
