import React from "react";
import styles from "./ArticleCategoryCard.module.css";

const ArticleCategoryCard = (props) => {
  const { article } = props;

  const renderCategories = (data) =>
    data.map((d) => (
      <span
        key={d._id}
        className={`badge badge-pill badge-info mr-3 ${styles.category}`}
      >
        {d.name}
      </span>
    ));

  return (
    <div className="row mt-5">
      <div className="col-8 mx-auto">
        <div className="card mx-auto">
          <div className="card-body">
            <div className="row d-flex">
              <div className="col-md-4 col-12 d-flex align-items-center">
                <img
                  src={article.featuredPhoto}
                  className={`card-img-top ${styles.myimage}`}
                  alt={article.title}
                  title={article.title}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-md-8 col-12">
                <h4 className="card-title font-weight-bold">{article.title}</h4>
                <p>{renderCategories(article.category)}</p>
                <p className="card-text">{article.mdesc + `...`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCategoryCard;