import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastProvider, useToasts } from "react-toast-notifications";

import styles from "./ForgotPassword.module.css";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const ToastedResetPassword = () => {
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
        <div>{showForm()}</div>
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
