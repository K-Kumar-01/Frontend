import Head from "next/head";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

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
        <Header />
        <Footer />
      </Layout>
    </React.Fragment>
  );
};

export default ForgotPasswordPage;
