import { useRouter } from "next/router";
import { useEffect } from "react";

const Error = ({ statusCode }) => {
  const router = useRouter();
  useEffect(() => {
    $(".full-screen").mousemove(function (event) {
      var eye = $(".eye");
      var x = eye.offset().left + eye.width() / 2;
      var y = eye.offset().top + eye.height() / 2;
      var rad = Math.atan2(event.pageX - x, event.pageY - y);
      var rot = rad * (180 / Math.PI) * -1 + 180;
      eye.css({
        "-webkit-transform": "rotate(" + rot + "deg)",
        "-moz-transform": "rotate(" + rot + "deg)",
        "-ms-transform": "rotate(" + rot + "deg)",
        transform: "rotate(" + rot + "deg)",
      });
    });
  }, []);

  return (
    <div className="full-screen">
      <div className="container">
        <span className="error-num">5</span>
        <div className="eye"></div>
        <div className="eye"></div>

        <p className="sub-text">
          Oh eyeballs! Something went wrong. We're{" "}
          <span className="italic">looking</span> to see what happened.
        </p>
        <a href="">Go back</a>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
