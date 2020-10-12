import React from "react";
import Error from "next/error";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getParticularArticle } from "../../actions/article";
import OneArticle from "../../components/articles/OneArticle";

const SingleArticle = (props) => {
  return (
    <>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
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
      )}
    </>
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
