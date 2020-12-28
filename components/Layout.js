import Router from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";

import { removeCookieonExp } from "../helpers/auth";
import Footer from "./Footer";
import Header from "./Header";

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({
  withFooter = true,
  withHeader = true,
  children,
  headerSidebar = false,
  headerSearch = false,
}) => {
  useEffect(() => {
    removeCookieonExp();
  }, []);

  return (
    <React.Fragment>
      {withHeader && <Header sidebar={headerSidebar} search={headerSearch} />}
      <div className={withHeader && "shiftBottom"}>{children}</div>
      {withFooter && <Footer />}
    </React.Fragment>
  );
};

export default Layout;
