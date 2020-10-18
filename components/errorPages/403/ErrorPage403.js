import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./ErrorPage403.module.css";

const ErrorPage403 = (props) => {
  useEffect(() => {
    var root = document.documentElement;
    var eyef = document.getElementById("eyef");
    var cx = document.getElementById("eyef").getAttribute("cx");
    var cy = document.getElementById("eyef").getAttribute("cy");

    document.addEventListener("mousemove", (evt) => {
      let x = evt.clientX / innerWidth;
      let y = evt.clientY / innerHeight;

      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);

      cx = 115 + 30 * x;
      cy = 50 + 30 * y;
      eyef.setAttribute("cx", cx);
      eyef.setAttribute("cy", cy);
    });

    document.addEventListener("touchmove", (touchHandler) => {
      let x = touchHandler.touches[0].clientX / innerWidth;
      let y = touchHandler.touches[0].clientY / innerHeight;

      root.style.setProperty("--mouse-x", x);
      root.style.setProperty("--mouse-y", y);
    });
  }, []);

  const renderTextAccordingToStatus = (code) => (
    <React.Fragment>
      {code === 401 ? (
        <h2>
          You must be logged in. Click{" "}
          <Link href={`/signin`}>
            <a className={`${styles.link}`}>here </a>
          </Link>
          to login
        </h2>
      ) : (
        <h2>
          <p>This place is not yours. You are not allowed here.</p>
          Go {" "}
          <Link href={`/articles`}>
            <a className={`${styles.link}`}>Home!</a>
          </Link>
        </h2>
      )}
    </React.Fragment>
  );

  return (
    <section className={`${styles.errorContainer}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="robot-error"
        viewBox="0 0 260 118.9"
      >
        <defs>
          <clipPath id="white-clip">
            <circle id="white-eye" fill="#cacaca" cx="130" cy="65" r="20" />{" "}
          </clipPath>
          <text id="text-s" class={`${styles.errorText}`} y="106">
            {" "}
            {props.error}{" "}
          </text>
        </defs>
        <path
          class="alarm"
          fill="#e62326"
          d="M120.9 19.6V9.1c0-5 4.1-9.1 9.1-9.1h0c5 0 9.1 4.1 9.1 9.1v10.6"
        />
        <use xlinkHref="#text-s" x="-0.5px" y="-1px" fill="black"></use>
        <use xlinkHref="#text-s" fill="#2b2b2b"></use>
        <g id="robot">
          <g id="{`${styles.eyeWrap}`}">
            <use xlinkHref="#white-eye"></use>
            <circle
              id="eyef"
              class={`${styles.eye}`}
              clip-path="url(#white-clip)"
              fill="#000"
              stroke="#2aa7cc"
              stroke-width="2"
              stroke-miterlimit="10"
              cx="130"
              cy="65"
              r="11"
            />
            <ellipse
              id="white-eye"
              fill="#2b2b2b"
              cx="130"
              cy="40"
              rx="18"
              ry="12"
            />
          </g>
          <circle
            class={`${styles.lightblue}`}
            cx="105"
            cy="32"
            r="2.5"
            id="tornillo"
          />
          <use xlinkHref="#tornillo" x="50"></use>
          <use xlinkHref="#tornillo" x="50" y="60"></use>
          <use xlinkHref="#tornillo" y="60"></use>
        </g>
      </svg>
      {renderTextAccordingToStatus(props.error)}
    </section>
  );
};

export default ErrorPage403;