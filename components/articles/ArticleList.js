import React from "react";

const ArticleList = (props) => {
  const { articles } = props;

  const renderArticles = (data) => {};

  return (
    <div className={`container`}>
      <section className={`trending`}>
        <h1>TRENDING</h1>
      </section>
      <section className={`latest`}>
        <h1>LATEST</h1>
        <div className={`row`}>
          <div className={`col-12`}></div>
        </div>
      </section>
    </div>
  );
};

export default ArticleList;
