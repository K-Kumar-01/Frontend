import React, { useEffect, useState } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Error from "next/error";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../../components/Layout";
import ArticleEdit from "../../../components/crud/article/ArticleEdit";
import Preloader from "../../../components/spinner/Preloader";
import ErrorPage404 from "../../404";
import { getParticularArticle } from "../../../actions/article";
import { authenticate } from "../../../helpers/auth";
import { COOKIE_NAME, FETCH_TYPE, DOMAIN } from "../../../appConstants";

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

  const head = () => (
    <Head>
      <title>Edit Article: {props.article.title} | TITAN READ</title>
      <meta
        name="description"
        content={`Edit the article created. Made a mistake or want to add more. Change category or photo. Edit as you like`}
      />
      <link
        rel="canonical"
        href={`${DOMAIN}/articles/edit/${props.article.slug}`}
      />
      <meta
        property="og:title"
        content={`${props.article.title} | TITAN READ`}
      />
      <meta
        property="og:description"
        content="Edit the article created. Made a mistake or want to add more. Change category or photo. Edit as you like"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/articles/edit/${props.article.slug}`}
      />
      <meta property="og:site_name" content="TITAN READ" />

      <meta property="og:image" content={`${props.article.featuredPhoto}`} />
      <meta
        property="og:image:secure_url"
        content={`${props.article.featuredPhoto}`}
      />
      <meta property="og:image:type" content="image/jpeg" />
    </Head>
  );

  const renderPageContents = () => (
    <React.Fragment>
      {head()}
      {isAuth ? (
        <main>
          <Layout headerSidebar={true}>
            <ArticleEdit article={props.article} />
          </Layout>
        </main>
      ) : (
        <Preloader message={`Redirecting to signin page`} />
      )}
    </React.Fragment>
  );

  return <React.Fragment>{renderPageContents()}</React.Fragment>;
};

const EditArticlePage = (props) => {
  return (
    <React.Fragment>
      {props.error ? (
        props.error === 404 ? (
          <ErrorPage404 />
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <ToastProvider placement="bottom-right">
          <ComponentWithToasts article={props.article} />
        </ToastProvider>
      )}
    </React.Fragment>
  );
};

export async function getServerSideProps(props) {
  let response;
  try {
    response = await getParticularArticle(props.query.slug, FETCH_TYPE);
  } catch (error) {
    return { props: { error: 500 } };
  }
  if (response.error) {
    return { props: { error: response.error.status } };
  } else {
    return {
      props: {
        article: response.article || null,
        articles: response.articles || null,
      },
    };
  }
}

export default EditArticlePage;
