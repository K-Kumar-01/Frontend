import React from "react";
import { IconContext } from "react-icons";
import { HiOutlineEmojiSad } from "react-icons/hi";

import ArticleCategoryCard from "./ArticleCategoryCard";

const ArticlesListCategory = (props) => {
  const renderArticles = (data) => {
    if (!data.length) {
      return (
        <section className={`text-center`}>
          <IconContext.Provider value={{ color: `#FED15A`, size: "4rem" }}>
            <div>
              <HiOutlineEmojiSad />
            </div>
          </IconContext.Provider>
          <p>No Articles of this category have been created</p>
        </section>
      );
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

  return (
    <div style={{ minHeight: "65vh" }}>{renderArticles(props.articles)}</div>
  );
};

export default ArticlesListCategory;
