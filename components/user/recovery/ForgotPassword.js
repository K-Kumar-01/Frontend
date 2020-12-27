import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

import LoadingSpinner from "../../spinner/LoadingSpinner";
import { forgotPasswordMail } from "../../../actions/user";
import { authenticate } from "../../../helpers/auth";
import { COOKIE_NAME } from "../../../appConstants";

import styles from "./ForgotPassword.module.css";

const ToastedForgotPassword = () => {
  const { addToast } = useToasts();
  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: "onTouched",
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let token = authenticate(COOKIE_NAME);
    if (token) {
      router.push(`/user/profile/${token.username}`);
    }
    setLoading(false);
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    let response;
    setLoading(true);
    try {
      response = await forgotPasswordMail(data.username);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(`${response.message}`, {
          appearance: "success",
          autoDismiss: true,
        });
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
      <button
        type="submit"
        className={`btn btn-lg btn-info btn-block text-uppercase font-weight-bold mb-2 ${styles.btnSendMail}`}
        disabled={
          Object.keys(formState.touched).length === 0 ||
          Object.keys(errors).length !== 0
        }
      >
        Send Mail
      </button>
    </form>
  );

  return (
    <main style={{ minHeight: "73vh" }} className={`${styles.parentContainer}`}>
      {loading && <LoadingSpinner asOverlay />}
      <section className={`${styles.mainBg}`}></section>
      <section className={`${styles.contentArea}`}>
        <section className={`container py-2`}>
          <h1 className={`text-center heading`}>Forgot Password ?</h1>
          <p className={`text-center ${styles.changedFont}`}>
            No worries. Just type in the username below and we will send a link
            to reset the password.
          </p>
          <div className={`row`}>
            <div className={`col-lg-8 col-md-9 col-10 mx-auto`}>
              {showForm()}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

const ForgotPassword = () => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedForgotPassword />
    </ToastProvider>
  );
};

export default ForgotPassword;
