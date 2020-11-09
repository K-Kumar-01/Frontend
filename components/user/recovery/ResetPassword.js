import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

import LoadingSpinner from "../../spinner/LoadingSpinner";

import styles from "./ForgotPassword.module.css";
import { resetPassword } from "../../../actions/user";
import { decodeCookie, authenticate } from "../../../helpers/auth";
import { COOKIE_NAME } from "../../../appConstants";

const ToastedResetPassword = () => {
  const { addToast } = useToasts();
  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: "onTouched",
  }); // initialise the hook
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const redirectIfAuthenticated = () => {
    let token;
    token = authenticate(COOKIE_NAME);
    if (token) {
      setLoading(false);
      router.push(`/user/profile/${token.username}`);
    } else {
      setLoading(false);
      checkForToken();
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, []);

  const checkForToken = () => {
    if (router.query.token) {
      let result = true;
      let decodedToken = decodeCookie(router.query.token);
      if (!decodedToken) {
        result = false;
      }
      let expDate = decodedToken && decodedToken.exp * 1000;
      if (parseInt(new Date().getTime()) > expDate) {
        result = false;
      }
      if (!result) {
        addToast(
          `Looks like the link is broken or got expired. Please resend password reset mail`,
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
        setTimeout(() => {
          addToast("Redirecting you to forgot password page", {
            appearance: "info",
            autoDismiss: true,
          });
          router.replace("/forgot-password");
        }, 3000);
      }
    }
  };

  const onSubmit = async (data, e) => {
    let response;
    setLoading(true);
    console.log(router.query.token);
    try {
      response = await resetPassword(
        router.query.username,
        {
          newpassword: data.password,
        },
        router.query.token
      );
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(`${response.message}. Redirecting you to signin`, {
          appearance: "success",
          autoDismiss: true,
        });
        router.replace("/signin");
      }
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const showForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="password">New Password</label>
        <p className={`text-danger ${styles.errors}`}>
          {errors.password && "Password must be atleast 6 character long"}
        </p>
      </div>
      <div className={`${styles.formLabelGroup}`}>
        <input
          type="password"
          name="cpassword"
          className={`form-control`}
          id="cpassword"
          placeholder="•••••••"
          ref={register({ validate: (value) => value === watch("password") })}
          autoComplete="off"
          style={errors.cpassword && { border: "1px solid red" }}
        />
        <label htmlFor="cpassword">Confirm New Password</label>
        <p className={`text-danger ${styles.errors}`}>
          {errors.cpassword && "Passwords do not match"}
        </p>
      </div>
      <button
        type="submit"
        className={`btn btn-lg btn-info btn-block text-uppercase font-weight-bold mb-2 ${styles.btnSendMail}`}
        disabled={
          Object.keys(formState.touched).length === 0 ||
          Object.keys(errors).length !== 0
        }
      >
        Reset Password
      </button>
    </form>
  );

  return (
    <main style={{ minHeight: "70vh" }}>
      {loading && <LoadingSpinner asOverlay />}
      <section className={`container my-4 py-2`}>
        <h1 className={`text-center heading`}>Reset Password</h1>
        <p className={`text-center ${styles.changedFont}`}>
          Enter the new password
        </p>
        <div className={`row`}>
          <div className={`col-lg-8 col-md-9 col-10 mx-auto`}>{showForm()}</div>
        </div>
      </section>
    </main>
  );
};

const ResetPassword = () => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedResetPassword />
    </ToastProvider>
  );
};

export default ResetPassword;
