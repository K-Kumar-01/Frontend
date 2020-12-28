import React, { useEffect, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import ArticleCreate from "../../components/crud/article/ArticleCreate";
import Preloader from "../../components/spinner/Preloader";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME, DOMAIN } from "../../appConstants";

const ComponentWithToasts = () => {
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

  const head = () => (
    <Head>
      <title>Create Article | TITAN READ</title>
      <meta
        name="description"
        content="Create a article. Let your imagination and words take over the world."
      />
      <link rel="canonical" href={`${DOMAIN}/articles/create`} />
      <meta property="og:title" content={`Create Article | TITAN READ`} />
      <meta
        property="og:description"
        content={`Create a article. Let your imagination and words take over the world.`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/articles/create`} />
      <meta property="og:site_name" content={`TITAN READ`} />
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
      {isAuth ? (
        <main>
          <Layout headerSidebar={true}>
            <ArticleCreate />
          </Layout>
        </main>
      ) : (
        <Preloader message={`Redirecting to signin page`} />
      )}
    </React.Fragment>
  );
};

const CreateArticle = () => {
  return (
    <ToastProvider>
      <ComponentWithToasts />
    </ToastProvider>
  );
};

export default CreateArticle;
