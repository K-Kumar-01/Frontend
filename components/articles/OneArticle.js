import React, { useState, useEffect } from "react";
import Dante from "Dante2";
import Link from "next/link";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

import styles from "./OneArticle.module.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import { toggleFavourites, toggleLikes } from "../../actions/article";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

const ToastedOneArticle = (props) => {
  const { article, articles } = props;
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(props.isFav);
  const [liked, setLiked] = useState(false);
  const [isauth, setIsAuth] = useState(false);
  const [likedBy, setLikedBy] = useState(article.likedBy);
  const [likedNumber, setLikedNumber] = useState(article.likes);

  const { addToast } = useToasts();
  const router = useRouter();

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    console.log(tokenData);
    setIsAuth(tokenData);
    if (!tokenData) {
      return;
    }
    let isLiked;
    isLiked = likedBy.findIndex((l) => l._id === tokenData.id) !== -1;
    setLiked(isLiked);
  }, []);

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

  const handleLike = async () => {
    let response;
    try {
      setLoading(true);
      response = await toggleLikes(router.query.slug);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setLikedBy(response.likedList);
        setLikedNumber(response.likes);
        setLiked(
          response.likedList.findIndex((l) => l._id === isauth.id) !== -1
        );
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

  const renderLikesArea = () => (
    <div className={`${styles.likesArea}`}>
      {isauth && (
        <IconContext.Provider value={{ size: "1.4rem", color: "#395693" }}>
          <span style={{ cursor: "pointer" }} onClick={() => handleLike()}>
            {liked ? (
              <span title="Liked this post">
                <FaThumbsUp />
              </span>
            ) : (
              <span title="Like this post">
                <FaRegThumbsUp />
              </span>
            )}
          </span>
        </IconContext.Provider>
      )}
      {likedNumber > 0 && (
        <span>
          Liked by{" "}
          {isauth && liked ? (
            <strong className={`${styles.pointedCursor}`}>you </strong>
          ) : null}
          {liked ? (
            likedNumber - 1 > 0 ? (
              likedNumber - 1 > 1 ? (
                <span>
                  and{" "}
                  <strong
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    className={`${styles.pointedCursor}`}
                  >
                    {likedNumber - 1} others
                  </strong>
                </span>
              ) : (
                <span>
                  and{" "}
                  <strong
                    data-toggle="modal"
                    data-target="#staticBackdrop"
                    className={`${styles.pointedCursor}`}
                  >
                    {likedNumber - 1} other
                  </strong>
                </span>
              )
            ) : (
              ``
            )
          ) : likedNumber > 1 ? (
            <strong
              data-toggle="modal"
              data-target="#staticBackdrop"
              className={`${styles.pointedCursor}`}
            >
              {likedNumber} others
            </strong>
          ) : (
            likedNumber > 0 && (
              <strong
                data-toggle="modal"
                data-target="#staticBackdrop"
                className={`${styles.pointedCursor}`}
              >
                {likedNumber} other
              </strong>
            )
          )}
        </span>
      )}
    </div>
  );

  const renderLikesList = (data) =>
    data.map((d) => (
      <div
        key={d._id}
        className={`d-flex justify-content-start align-items-center`}
      >
        <div className={``}>
          <Link href={`/user/profile/${d.username}`}>
            <a>
              <img
                className={`img img-fluid ${styles.likedImage}`}
                src={d.avatar}
                alt={d.name}
              />
            </a>
          </Link>
        </div>
        <div className={`${styles.likedByPerson}`}>
          <p>
            <Link href={`/user/profile/${d.username}`}>
              <a className={`${styles.likedByLink}`}>
                <strong>{d.username}</strong>
              </a>
            </Link>
            <br />
            {d.name}
            {/* <br />
            {d.email} */}
          </p>
        </div>
      </div>
    ));

  const renderAuthorAndDateInfo = (authorInfo, dateInfo) => (
    <div className={`col-sm-11 col-md-9 mx-auto`}>
      <div className={`d-flex align-items-center justify-content-between`}>
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
              <span className={`${styles.date}`}>{` ${new Date(
                dateInfo.createdAt
              )
                .toDateString()
                .substring(4)}`}</span>
            </p>
          </div>
        </div>
        {isauth && (
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
        )}
      </div>
      <div>{renderLikesArea()}</div>
    </div>
  );

  const renderLikedByModal = () => (
    <div
      class="modal fade "
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Liked By
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{renderLikesList(likedBy)}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className={` container ${styles.page} `}>
      {renderLikedByModal()}
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
