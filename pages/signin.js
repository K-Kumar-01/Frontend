import React from "react";
import Head from "next/head";
import SigninComponent from "../components/auth/SigninComponent";
import Layout from "../components/Layout";
import Protected from "../components/Protected/Protected";
import { DOMAIN } from "../appConstants";

const Signin = () => {
  const head = () => {
    return (
      <Head>
        <title>Signin | TITAN READ</title>
        <meta
          name="description"
          content={`Make your account on TITAN READ. Join us and exlpore TITAN READ`}
        />
        <link rel="canonical" href={`${DOMAIN}/signin`} />
        <meta property="og:title" content={`SIGNIN | TITAN READ`} />
        <meta
          property="og:description"
          content={`Create account TITAN READ. Join us and exlpore TITAN READ`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/signin`} />
        <meta property="og:site_name" content={`TITAN READ`} />

        {/* <meta property="og:image" content={`${signinImage}`} />
					<meta property="og:image:secure_url" content={`${signinImage}`} />
					<meta property="og:image:type" content="image/jpeg" />
					<meta property="fb:app_id" content={FB_APP_ID} /> */}
      </Head>
    );
  };
  return (
    <React.Fragment>
      {head()}
      <Protected>
        <Layout>
          <SigninComponent />
        </Layout>
      </Protected>
    </React.Fragment>
  );
};

export default Signin;
