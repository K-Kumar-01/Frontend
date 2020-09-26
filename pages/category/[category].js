import React, { useEffect } from "react";
import Error from "next/error";

import { getArticlesByCategory } from "../../actions/article";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticlesListCategory from "../../components/category/ArticlesListCategory";

const CategoryArticles = (props) => {
  useEffect(() => {});

  return (
    <>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <Layout>
          <Header sidebar>
            <ArticlesListCategory articles={props.articles} />
          </Header>
          <Footer />
        </Layout>
      )}
    </>
  );
};

CategoryArticles.getInitialProps = async (props) => {
  let response;
  try {
    response = await getArticlesByCategory(props.query.category);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { articles: response.articles };
  }
};

export default CategoryArticles;
