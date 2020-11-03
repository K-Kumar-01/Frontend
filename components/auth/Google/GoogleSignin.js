import { useState } from "react";
import { useGoogleLogin } from "react-google-login";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

import { signinWithGoogle } from "../../../actions/auth";
import styles from "./GoogleSignin.module.css";
import { COOKIE_NAME } from "../../../appConstants";
import { setCookie, authenticate } from "../../../helpers/auth";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const ToastedGoogleSignin = () => {
  // for dev
  const clientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`;

  // for prod
  // const clientId = `${process.env.GOOGLE_CLIENT}`;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();
  const onSuccess = async (res) => {
    const gToken = res.tokenId;
    let response;

    setLoading(true);

    try {
      response = await signinWithGoogle({ gToken });
    } catch (error) {
      $("#getStartedModal").modal("toggle");
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: "true",
      });
    }
    $("#getStartedModal").modal("toggle");
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
      setCookie(COOKIE_NAME, response.token);
      router.push(`/articles`);
    }
  };

  const onFailure = (res) => {
    $("#getStartedModal").modal("toggle");
    console.log(res);
    addToast(`${res.error}`, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: "offline",
  });

  return (
    <React.Fragment>
      {loading && <LoadingSpinner asOverlay />}
      <button
        onClick={() => {
          if (authenticate(COOKIE_NAME)) {
            let decoded = authenticate(COOKIE_NAME);
            router.push(`/user/profile/${decoded.username}`);
          } else {
            signIn();
          }
        }}
        className={`btn ${styles.googleLoginBtn}`}
      >
        <IconContext.Provider value={{ size: "2rem" }}>
          <FcGoogle />
        </IconContext.Provider>
        <span className={`${styles.text}`}>Continue with google</span>
      </button>
    </React.Fragment>
  );
};

const GoogleSignin = () => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedGoogleSignin />
    </ToastProvider>
  );
};

export default GoogleSignin;
