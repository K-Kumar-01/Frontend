import React from "react";
import { getArticlesBySpecificUser } from "../../../actions/user";

const ArticlesBySpecificUserPage = () => {
  return <div></div>;
};

ArticlesBySpecificUserPage.getInitialProps = async (props) => {
  let username = props.query.username;
  let response;
  try {
    response = await getArticlesBySpecificUser(username);
  } catch (error) {
    return { error: response.error.status };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { articles: response.articles };
  }
};

export default ArticlesBySpecificUserPage;
