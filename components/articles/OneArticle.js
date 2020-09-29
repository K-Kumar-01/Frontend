import React from "react";
import Dante from "Dante2";
import Link from "next/link";

import styles from "./OneArticle.module.css";

const OneArticle = (props) => {
  const { article } = props;

  const renderCategories = (data) =>
    data.map((d) => (
      <Link href={`/category/${d.name.toLowerCase()}`}>
        <a
          key={d._id}
          className={`badge badge-pill badge-info mr-3 ${styles.category}`}
        >
          {d.name}
        </a>
      </Link>
    ));
  return (
    <section className={` container `}>
      <main className={`row`}>
        <h1 className={`col-12 text-center`}>{article.title}</h1>
        <div className={`col-sm-11 col-md-9 mx-auto`}>{renderCategories(article.category)}</div>
        <br />
        <div className={`col-sm-11 col-md-9 mx-auto`}>
          <Dante read_only content={JSON.parse(article.body)} />
        </div>
      </main>
    </section>
  );
};

export default OneArticle;
