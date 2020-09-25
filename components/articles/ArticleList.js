import React, { useState, useEffect } from "react";
import styles from "./ArticleList.module.css";

const ArticleList = (props) => {
  const { articles } = props;

  const [trending, setTrending] = useState([]);
  useEffect(() => {
    let trends = [];
    let uplimit = Math.min(10, articles.length);

    // get 4 random articles
    for (let i = 0; i < 4; ) {
      let randnum = Math.floor(Math.random() * uplimit);
      if (!trends.includes(randnum)) {
        trends.push(randnum);
        i++;
      }
    }

    trends.sort((a, b) => a - b);

    let trendingArticles = [];
    for (let i = 0; i < 4; i++) {
      trendingArticles.push(articles[trends[i]]);
    }

    setTrending(trendingArticles);
  }, []);

  const renderSideArticles = (data) => {
    return data.map((d) => (
      <div className={`col-md-4 mt-3`} key={d._id}>
        <div className={`w-100`}>
          <img
            className={`img-fluid ${styles.sideImage}`}
            src={d.featuredPhoto}
            title={d.title}
            alt={d.title}
          />
        </div>
        <div className={`d-flex align-items-center justify-content-between`}>
          <div className={`w-80`}>
            <h4>{d.title}</h4>
          </div>
          <div className={`w-80`}>Fav</div>
        </div>
      </div>
    ));
  };

  const renderMainArticle = (data) => {
    return (
      <div className={`col-12`}>
        <div className={`row`}>
          <div className={`col-lg-6`}>
            <img
              className={`img-fluid ${styles.mainImage}`}
              src={`${data.featuredPhoto}`}
              title={data.title}
              alt={data.title}
              style={{ maxHeight: "360px" }}
            />
          </div>
          <div className={`col-lg-6`}>
            <h3>{data.title}</h3>
            <p className="d-none d-lg-block">{data.mdesc + `...`}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`container`}>
      <section className={`trending`}>
        <h1>TRENDING</h1>
        <div className={`row`}>
          {renderMainArticle(trending[0])}
          {renderSideArticles(trending.slice(1, 4))}
        </div>
      </section>
      <hr />
      <section className={`latest`}>
        <h1>LATEST</h1>
        <div className={`row`}>
          {renderMainArticle(articles[0])}
          {renderSideArticles(articles.slice(1, 4))}
        </div>
      </section>
    </div>
  );
};

export default ArticleList;
