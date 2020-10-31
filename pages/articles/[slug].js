import React from "react";
import Error from "next/error";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getParticularArticle } from "../../actions/article";
import OneArticle from "../../components/articles/OneArticle";
import ErrorPage404 from "../404";
import Head from "next/head";
import { DOMAIN } from "../../appConstants";

const SingleArticle = (props) => {
  const head = () => (
    <Head>
      <title>Article: {props.article.title} | TITAN READ</title>
      <meta name="description" content={`${props.article.mdesc}`} />
      <link rel="canonical" href={`${DOMAIN}/articles/${props.article.slug}`} />
      <meta property="og:title" content={`${props.article.title} | TITAN READ`} />
      <meta property="og:description" content={props.article.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/articles/${props.article.slug}`} />
      <meta property="og:site_name" content="TITAN READ" />

      <meta property="og:image" content={`${props.article.featuredPhoto}`} />
      <meta
        property="og:image:secure_url"
        content={`${props.article.featuredPhoto}`}
      />
      <meta property="og:image:type" content="image/jpeg" />
    </Head>
  );

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
              <OneArticle
                article={props.article}
                articles={props.articles}
                isFav={props.isFav}
              />
            </Header>
            <Footer />
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

SingleArticle.getInitialProps = async (props) => {
  let response;
  let token = props.req.headers.cookie;
  token = token && token.split("=")[1];
  try {
    response = await getParticularArticle(props.query.slug, undefined, token);
  } catch (error) {
    console.log(error);
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return {
      article: response.article,
      articles: response.articles,
      isFav: response.isFav,
    };
  }
};

export default SingleArticle;
