import React from "react";
import Dante from "Dante2";
import Link from "next/link";

import styles from "./OneArticle.module.css";

const OneArticle = (props) => {
  const { article, articles } = props;

  const renderCategories = (data) =>
    data.map((d) => (
      <Link key={d._id} href={`/category/${d.name.toLowerCase()}`}>
        <a className={`mr-3 h6 font-weight-bold ${styles.badge}`}>{d.name}</a>
      </Link>
    ));

  const renderSimilarArticles = (data) =>
    data.map((d) => (
      <div className={`col-lg-3 col-md-6 d-flex justify-content-between px-2`}>
        <div className={`mr-2 `}>
          <h4>
            <strong>{d.title}</strong>
          </h4>
          <p>
            <Link href={`/user/profile/${d.postedBy.username}`}>
              <a className={`${styles.similarLink}`}>{d.postedBy.username}</a>
            </Link>
            {` in `}
            <Link href={`/category/${d.category[0].name}`}>
              <a className={`${styles.similarLink}`}>{d.category[0].name}</a>
            </Link>
          </p>
        </div>
        <div>
          <img
            className={`img-fluid ${styles.similarImage}`}
            alt={d.title}
            src={d.featuredPhoto}
          />
        </div>
      </div>
    ));
  return (
    <section className={` container `}>
      <main className={`row`}>
        <h1 className={`col-12 text-center mb-5`}>{article.title}</h1>
        <div className={`col-sm-11 col-md-9 mx-auto`}>
          <Dante read_only content={JSON.parse(article.body)} />
        </div>
        <div className={`col-sm-11 col-md-9 mx-auto my-3`}>
          {renderCategories(article.category)}
        </div>
      </main>
      <div className={`row`}>{renderSimilarArticles(articles || [])}</div>
    </section>
  );
};

export default OneArticle;
