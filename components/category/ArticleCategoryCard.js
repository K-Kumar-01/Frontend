import React from "react";
import Link from "next/link";

import styles from "./ArticleCategoryCard.module.css";

const ArticleCategoryCard = (props) => {
  const { article } = props;

  const renderCategories = (data) =>
    data.map((d) => (
      <Link
        key={d._id}
        href="/category/[category]"
        as={`/category/${d.name.toLowerCase()}`}
      >
        <a className={`badge badge-info mr-3 ${styles.category}`}>{d.name}</a>
      </Link>
    ));

  return (
    <div className="row mt-5">
      <div className="col-lg-9 col-md-10 col-sm-11 mx-auto">
        <div className="card mx-auto">
          <div className="card-body">
            <div className="row d-flex">
              <div
                className={`${
                  props.fav ? "col-md-2" : "col-md-4"
                } col-10 mx-auto d-flex align-items-center`}
              >
                <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                  <a>
                    <img
                      src={article.featuredPhoto}
                      className={`card-img-top ${styles.myimage}`}
                      alt={article.title}
                      title={article.title}
                      style={{ width: "100%" }}
                    />
                  </a>
                </Link>
              </div>
              <div className={`${props.fav ? "col-md-10" : "col-md-8"} col-12`}>
                <Link href="/articles/[slug]" as={`/articles/${article.slug}`}>
                  <a className={`${styles.link} ${styles.headLink}`}>
                    <h4 className="card-title font-weight-bold">
                      {article.title}
                    </h4>
                  </a>
                </Link>
                {!props.fav && <p>{renderCategories(article.category)}</p>}
                <p className="card-text">{article.mdesc + `...`}</p>
                {!props.fav && (
                  <React.Fragment>
                    <p className={`d-none d-lg-block`}>
                      <section>
                        <span className={`font-weight-bold h5`}>
                          Posted by:{` `}
                        </span>
                        <Link
                          href="../user/profile/[username]"
                          as={`../user/profile/${article.postedBy?.username}`}
                        >
                          <a className={`${styles.link}`}>
                            {article.postedBy?.username}
                          </a>
                        </Link>
                      </section>
                      <section>
                        <span className={`font-weight-bold h5`}>
                          Posted on:{` `}
                        </span>
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </section>
                    </p>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCategoryCard;
