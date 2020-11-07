import Head from "next/head";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const head = () => (
  <Head>
    <title>Reset Password | TITAN READ</title>
    <meta
      name="description"
      content={`Change your password here if you forgot. Once succesfull, login with new password and enjoy the site`}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
  </Head>
);

const ResetPasswordPage = () => {
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <Header />
        <Footer />
      </Layout>
    </React.Fragment>
  );
};

export default ResetPasswordPage;
