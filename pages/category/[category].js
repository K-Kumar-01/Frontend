import React from "react";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticlesListCategory from "../../components/category/ArticlesListCategory";
import ErrorPage404 from "../404";
import { getArticlesByCategory } from "../../actions/article";
import { DOMAIN } from "../../appConstants";

const CategoryArticles = (props) => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>Articles of category{` ${router.query.category}`}</title>
      <meta
        name="description"
        content={`The page contains the articles of the category ${router.query.category}`}
      />
      <link
        rel="canonical"
        href={`${DOMAIN}/category/${router.query.category}`}
      />
      <meta
        property="og:title"
        content={`Articles of category ${router.query.category} | TITAN READ`}
      />
      <meta
        property="og:description"
        content={`The page contains the articles of the category ${router.query.category}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/category/${router.query.category}`}
      />
      <meta property="og:site_name" content={`TITAN READ`} />
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
            <Header sidebar search={true}>
              <ArticlesListCategory articles={props.articles} />
            </Header>
            <Footer />
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
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
