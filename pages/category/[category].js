import React, { useEffect } from "react";
import { getArticlesByCategory } from "../../actions/article";

const CategoryArticles = (props) => {
  useEffect(() => {
    console.log(props);
  });

  return <div>Hello</div>;
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
