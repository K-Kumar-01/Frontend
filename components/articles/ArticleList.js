import React from "react";

const ArticleList = (props) => {
  const { articles } = props;

  const renderArticles = (data) => {};

  const renderMainArticle = (index = 0) => {
    return (
      <div className={`col-12`}>
        <div className={`d-flex`}>
          <div className={`w-50`}>
            <img
              className={`img-fluid`}
              src={`${articles[index].featuredPhoto}`}
              title={articles[index].title}
              alt={articles[index].title}
              style={{ maxHeight: "360px" }}
            />
          </div>
          <div className={`w-50`}>
            <h3>{articles[index].title}</h3>
            {articles[index].mdesc + `...`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`container`}>
      <section className={`trending`}>
        <h1>TRENDING</h1>
      </section>
      <hr />
      <section className={`latest`}>
        <h1>LATEST</h1>
        <div className={`row`}>{renderMainArticle(0)}</div>
      </section>
    </div>
  );
};

export default ArticleList;
