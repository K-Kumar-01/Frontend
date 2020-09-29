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
    <section className={` container`}>
      <h1 className={`text-center`}>{article.title}</h1>
      <div>{renderCategories(article.category)}</div>
      <br />
      <Dante read_only content={JSON.parse(article.body)} />
    </section>
  );
};

export default OneArticle;
