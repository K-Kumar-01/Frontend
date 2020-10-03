import React, { useEffect, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Error from "next/error";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";
import { authenticate } from "../../../helpers/auth";
import { COOKIE_NAME } from "../../../appConstants";
import { useRouter } from "next/router";
import Preloader from "../../../components/spinner/Preloader";
import { getParticularArticle } from "../../../actions/article";

const ComponentWithToasts = (props) => {
  const { addToast } = useToasts();
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (authenticate(COOKIE_NAME)) {
      setIsAuth(true);
    } else {
      addToast("Login required to perform this task", {
        appearance: "error",
        autoDismiss: true,
      });
      router.push("/signin");
    }
  }, []);

  const renderPageContents = () =>
    isAuth ? (
      <main>
        <Layout>
          <Header />

          <Footer />
        </Layout>
      </main>
    ) : (
      <Preloader message={`Redirecting to signin page`} />
    );

  return <>{renderPageContents()}</>;
};

const EditArticlePage = (props) => {

  return (
    <>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <ToastProvider placement="bottom-right">
          <ComponentWithToasts />
        </ToastProvider>
      )}
    </>
  );
};

EditArticlePage.getInitialProps = async (props) => {
  let response;
  
  try {
    response = await getParticularArticle(props.query.slug);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { article: response.article, articles: response.articles };
  }
};

export default EditArticlePage;
