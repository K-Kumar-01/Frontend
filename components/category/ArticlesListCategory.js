import React from "react";
import ArticleCategoryCard from "./ArticleCategoryCard";

const ArticlesListCategory = (props) => {
  const renderArticles = (data) => {
    if (!data.length) {
      return <div>No articles</div>;
    } else {
      return (
        <section>
          {data.map((d) => (
            <ArticleCategoryCard key={d._id} article={d} />
          ))}
        </section>
      );
    }
  };

  return <div>{renderArticles(props.articles)}</div>;
};

export default ArticlesListCategory;
