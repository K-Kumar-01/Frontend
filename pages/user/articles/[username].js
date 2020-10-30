import React from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

import { getArticlesBySpecificUser } from "../../../actions/user";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PostedArticles from "../../../components/user/PostedArticles";
import ErrorPage404 from "../../404";
import { DOMAIN } from "../../../appConstants";

const ArticlesBySpecificUserPage = (props) => {
  const router = useRouter();
  const head = () => {
    let data = null;
    if (props.userDetails) {
      data = props.userDetails.userInfo;
    }
    return (
      <Head>
        <title>{`Articles: ${router.query.username}`}</title>
        <meta
          name="description"
          content={`Articles written by the user ${router.query.username}`}
        />
        <link
          rel="canonical"
          href={`${DOMAIN}/user/articles/${router.query.username}`}
        />
        <meta
          property="og:title"
          content={`${router.query.username} | TITAN READ`}
        />
        <meta
          property="og:description"
          content={`Articles written by the user ${router.query.username}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/user/articles/${router.query.username}`}
        />
        <meta property="og:site_name" content="TITAN READ" />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {props.error ? (
        props.error === 404 ? (
          <ErrorPage404 />
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <React.Fragment>
          {head()}
          <Layout>
            <Header sidebar>
              <PostedArticles articles={props.articles} />
            </Header>
            <Footer />
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

ArticlesBySpecificUserPage.getInitialProps = async (props) => {
  let username = props.query.username;
  let response;
  try {
    response = await getArticlesBySpecificUser(username);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { articles: response.articles };
  }
};

export default ArticlesBySpecificUserPage;
