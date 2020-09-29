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
            <OneArticle article={props.article} />
          </Header>
          <Footer />
        </Layout>
      )}
    </>
  );
};

SingleArticle.getInitialProps = async (props) => {
  let response;
  try {
    response = await getParticularArticle(props.query.slug);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { article: response.article };
  }
};

export default SingleArticle;
