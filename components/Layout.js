import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { removeCookieonExp } from "../helpers/auth";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = (props) => {
  useEffect(() => {
    removeCookieonExp();
  }, []);

  return (
    <React.Fragment>
      <div>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
