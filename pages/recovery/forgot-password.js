import Head from "next/head";

import Layout from "../../components/Layout";
import ForgotPassword from "../../components/user/recovery/ForgotPassword";

const head = () => (
  <Head>
    <title>Forgot Password | TITAN READ</title>
    <meta
      name="description"
      content={`Forgot your password. Don't worry. Just enter your username and we will send a link to reset password`}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  </Head>
);

const ForgotPasswordPage = () => {
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <ForgotPassword />
      </Layout>
    </React.Fragment>
  );
};

export default ForgotPasswordPage;
