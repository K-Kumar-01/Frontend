import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";

import styles from "./ForgotPassword.module.css";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const ToastedForgotPassword = () => {
  const { addToast } = useToasts();
  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: "onTouched",
  }); // initialise the hook
  const [loading, setLoading] = useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
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
            to reset the password
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
