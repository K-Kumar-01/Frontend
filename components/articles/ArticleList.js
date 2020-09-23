import React from "react";

const ArticleList = (props) => {
  const { articles } = props;

  const renderSideArticles = (data) => {
    console.log(data);
    return data.map((d) => (
      <div className={`col-md-4 mt-3`} key={d._id}>
        <div className={`w-100`}>
          <img
            className={`img-fluid`}
            src={d.featuredPhoto}
            title={d.title}
            alt={d.title}
          />
        </div>
        <div className={`d-lg-flex align-items-center justify-content-between`}>
          <div className={`w-80`}>
            <h3>{d.title}</h3>
          </div>
          <div className={`w-80`}>Fav</div>
        </div>
      </div>
    ));
  };

  const renderMainArticle = (index = 0) => {
    return (
      <div className={`col-12`}>
        <div className={`row`}>
          <div className={`col-lg-6`}>
            <img
              className={`img-fluid`}
              src={`${articles[index].featuredPhoto}`}
              title={articles[index].title}
              alt={articles[index].title}
              style={{ maxHeight: "360px" }}
            />
          </div>
          <div className={`col-lg-6`}>
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
        <div className={`row`}>
          {renderMainArticle(0)}
          {renderSideArticles(articles.slice(1, 4))}
        </div>
      </section>
    </div>
  );
};

export default ArticleList;
