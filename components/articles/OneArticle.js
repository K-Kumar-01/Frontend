import React, { useState } from "react";
import Dante from "Dante2";
import Link from "next/link";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import styles from "./OneArticle.module.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { toggleFavourites } from "../../actions/article";
import LoadingSpinner from "../spinner/LoadingSpinner";

const ToastedOneArticle = (props) => {
  const { article, articles } = props;
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(props.isFav);

  const { addToast } = useToasts();
  const router = useRouter();

  const renderCategories = (data) =>
    data.map((d) => (
      <Link key={d._id} href={`/category/${d.name.toLowerCase()}`}>
        <a className={`mr-3 h6 font-weight-bold ${styles.badge}`}>{d.name}</a>
      </Link>
    ));

  const renderSimilarArticles = (data) =>
    data.map((d) => (
      <div
        className={`col-lg-3 col-md-6 d-flex justify-content-between px-2`}
        key={d._id}
      >
        <div className={`mr-2 `}>
          <Link href={`/articles/${d.slug}`}>
            <a className={`${styles.similarLink} ${styles.removeLine}`}>
              <h4>
                <strong>{d.title}</strong>
              </h4>
            </a>
          </Link>

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
          <Link href={`/articles/${d.slug}`}>
            <a>
              <img
                className={`img-fluid ${styles.similarImage}`}
                alt={d.title}
                src={d.featuredPhoto}
              />
            </a>
          </Link>
        </div>
      </div>
    ));

  const toggleFavorite = async () => {
    let response;
    try {
      setLoading(true);
      response = await toggleFavourites(router.query.slug);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setFav(response.addedFav);
        addToast(`${response.message}`, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const renderAuthorAndDateInfo = (authorInfo, dateInfo) => (
    <div
      className={`col-sm-11 col-md-9 mx-auto d-flex align-items-center justify-content-between`}
    >
      <div className={`d-flex align-items-center`}>
        <div className={``}>
          <Link href={`/user/profile/${authorInfo.username}`}>
            <a className={`${styles.similarLink}`}>
              <img
                className={`${styles.authorImg}`}
                alt={authorInfo.name}
                src={authorInfo.avatar}
              />
            </a>
          </Link>
        </div>
        <div>
          <p className={`pt-3 pl-3`}>
            <Link href={`/user/profile/${authorInfo.username}`}>
              <a className={`${styles.similarLink}`}>
                <strong>{authorInfo.name}</strong>
              </a>
            </Link>
            <br />
            <span className={`${styles.date}`}>{` ${new Date(dateInfo.createdAt)
              .toDateString()
              .substring(4)}`}</span>
          </p>
        </div>
      </div>
      <div>
        <IconContext.Provider value={{ size: "2rem", color: "#ED4956" }}>
          <div style={{ cursor: "pointer" }}>
            <span
              title={fav ? "In your favourites" : "Add to your Favourites"}
              onClick={() => toggleFavorite()}
            >
              {fav ? <FaHeart /> : <FaRegHeart />}
            </span>
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );

  return (
    <section className={` container `}>
      {loading && <LoadingSpinner asOverlay />}
      <main className={`row`}>
        <h1 className={`col-12 text-center mb-3 display-4`}>{article.title}</h1>
        {renderAuthorAndDateInfo(article.postedBy, {
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        })}
        <div className={`col-sm-11 col-md-9 mx-auto`}>
          <Dante read_only content={JSON.parse(article.body)} />
        </div>
        <div className={`col-sm-11 col-md-9 mx-auto my-3`}>
          {renderCategories(article.category)}
        </div>
      </main>
      {articles.length > 0 && (
        <main className={`px-3`}>
          <div className={`row`}>
            <div className={`col-12 px-2`}>
              <h1 className={`mb-3`}>Similar Articles</h1>
              <hr />
            </div>
            {renderSimilarArticles(articles || [])}
          </div>
        </main>
      )}
    </section>
  );
};

const OneArticle = (props) => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedOneArticle {...props} />
    </ToastProvider>
  );
};

export default OneArticle;
