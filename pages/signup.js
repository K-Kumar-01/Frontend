import React from "react";
import Head from "next/head";

import SignupComponent from "../components/auth/SignupComponent";
import Layout from "../components/Layout";
import Protected from "../components/Protected/Protected";
import { DOMAIN } from "../appConstants";

const Signup = () => {
  const head = () => {
    return (
      <Head>
        <title>Signup | TITAN READ</title>
        <meta name="description" content={`Make your account on TITAN READ. Join us and exlpore TITAN READ`} />
        <link rel="canonical" href={`${DOMAIN}/signup`} />
        <meta property="og:title" content={`SIGNUP | TITAN READ`} />
        <meta property="og:description" content={`Create account TITAN READ. Join us and exlpore TITAN READ`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/signup`} />
        <meta property="og:site_name" content={`TITAN READ`} />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Protected>
        <Layout withFooter={false} withHeader={false}>
          <SignupComponent />
        </Layout>
      </Protected>
    </React.Fragment>
  );
};

export default Signup;
