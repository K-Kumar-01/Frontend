import React from "react";
import { getArticlesBySpecificUser } from "../../../actions/user";
import Error from "next/error";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PostedArticles from "../../../components/user/PostedArticles";

const ArticlesBySpecificUserPage = (props) => {
  return (
    <React.Fragment>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <Layout>
          <Header sidebar>
            <PostedArticles articles={props.articles} />
          </Header>
          <Footer />
        </Layout>
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
