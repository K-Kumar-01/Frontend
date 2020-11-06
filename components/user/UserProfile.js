import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconContext } from "react-icons";
import { MdCreate } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { FcPhone } from "react-icons/fc";
import {
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaRegNewspaper,
  FaAngleRight,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

import styles from "./UserProfile.module.css";
import { authenticate, getCookie, decodeCookie } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { deleteParticularArticle } from "../../actions/article";
import { verifyMail, sendVerifcationMail } from "../../actions/user";

const ToastedUserProfile = (props) => {
  const [tokenDetails, setTokenDetails] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [slug, setSlug] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToasts();
  useEffect(() => {
    setTokenDetails(authenticate(COOKIE_NAME));
    checkForToken();
  }, []);

  const checkForToken = async () => {
    if (router.query.token) {
      let result = true;
      let decodedToken = decodeCookie(router.query.token);
      if (!decodedToken) {
        result = false;
      }
      let expDate = decodedToken.exp * 1000;
      if (parseInt(new Date().getTime()) > expDate) {
        result = false;
      }
      if (result) {
        if (!userInfo.isVerified) {
          let response;
          setLoading(true);
          try {
            response = await verifyMail(
              router.query.username,
              {
                isVerified: true,
              },
              getCookie(COOKIE_NAME)
            );
            setLoading(false);
            if (response.error) {
              addToast(`${response.error}`, {
                appearance: "error",
                autoDismiss: true,
              });
            } else {
              addToast(`${response.message}`, {
                appearance: "success",
                autoDismiss: true,
              });
              router.replace(
                `${window.location.origin}/user/profile/${router.query.username}`
              );
            }
          } catch (error) {
            setLoading(false);
            addToast(`${error.message}`, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
      } else {
        if (!userInfo.isVerified) {
          addToast(
            `Looks like the link is broken or got expired. Please resend the verification mail`,
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
        }
      }
    }
  };

  const resendVerficationMail = async () => {
    let response;
    setLoading(true);
    try {
      response = await sendVerifcationMail(
        router.query.username,
        getCookie(COOKIE_NAME)
      );
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
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

  const deleteArticle = async (slug) => {
    setLoading(true);
    let response;
    try {
      response = await deleteParticularArticle(slug);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      addToast(`${response.message}`, {
        appearance: "success",
        autoDismiss: true,
      });
      router.reload();
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const { userInfo } = props.userDetails;

  const renderArticles = (data) =>
    data.map((d) => (
      <section key={d._id} className={`${styles.articlearea}`}>
        <div className={`d-flex justify-content-between align-items-center`}>
          <Link href={`/articles/${d.slug}`}>
            <a>
              <h5 className={`${styles.headLink}`}>
                <FaAngleRight />
                {d.title}
              </h5>
            </a>
          </Link>
          {userInfo.username === tokenDetails.username && (
            <div className={`d-flex`}>
              <h5 className={`${styles.delete} mr-2`} title="Edit article">
                <Link href={`/articles/edit/${d.slug}`}>
                  <a>
                    <IconContext.Provider value={{ color: "#17A2B8" }}>
                      <FaEdit />
                    </IconContext.Provider>
                  </a>
                </Link>
              </h5>
              <h5
                className={`${styles.delete}`}
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={() => {
                  setModalTitle(d.title), setSlug(d.slug);
                }}
                title="Delete article"
              >
                <IconContext.Provider value={{ color: "#C23F3F" }}>
                  <FaTrashAlt />
                </IconContext.Provider>
              </h5>
            </div>
          )}
        </div>
        <p className={`h6 d-none d-md-block`}>{d.mdesc}</p>
      </section>
    ));

  const showArticles = () => {
    if (!userInfo.articles || !userInfo.articles.length) {
      return (
        <div className={`text-center`}>
          <IconContext.Provider value={{ color: `#FED15A`, size: "4rem" }}>
            <div>
              <HiOutlineEmojiSad />
            </div>
          </IconContext.Provider>
          <p>No articles published as of now</p>u
        </div>
      );
    } else {
      return <div>{renderArticles(userInfo.articles)}</div>;
    }
  };

  return (
    <div className={`container-fluid`}>
      {loading && <LoadingSpinner asOverlay />}
      <main>
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Article
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setModalTitle(false), setSlug(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the article{" "}
                <strong>'{modalTitle}'</strong>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    setModalTitle(false), setSlug(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => deleteArticle(slug)}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <main className={`${styles.maincontainer}`}>
        <section className={`${styles.basicinfo}`}>
          <div className={`w-100 ${styles.profile}`}>
            <div className={`${styles.backgroundCover} col-12`}></div>
            <div className={`container`}>
              <div className={`row pt-3`}>
                <div className={`col-lg-3 col-md-4 col-sm-12 text-center`}>
                  <img
                    src={`${userInfo.avatar}`}
                    className={`${styles.profileImage}`}
                  />
                </div>
                <div
                  className={`col-lg-9 col-md-8 col-sm-12 ${styles.profileInfo}`}
                >
                  <h3 className={`text-capitalize`}>{userInfo.name}</h3>
                  <h3>
                    Username:
                    <span
                      className={`${styles.boldWeight}`}
                    >{` ${userInfo.username}`}</span>
                  </h3>
                  <h3>
                    Joined on:{` `}
                    <span className={`${styles.boldWeight}`}>
                      {new Date(userInfo.createdAt).toLocaleDateString()}
                    </span>
                  </h3>
                  {userInfo.website && (
                    <h3>
                      Personal Website:
                      <span
                        className={`${styles.boldWeight}`}
                      >{` ${userInfo.website}`}</span>
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {!userInfo.isVerified && userInfo.username === tokenDetails.username && (
          <section className={`${styles.emailVerification} container my-3`}>
            <div className={`alert alert-primary`} role="alert">
              <h4 className="alert-heading text-center font-weight-bold">
                Email Verification
              </h4>
              <p>
                Your email address is not verified. To use all features of titan
                read verify the address using the link sent to your mail on
                signup.
              </p>
              <hr />
              <p className={`mb-0`}>
                If the link is broken or expired,{" "}
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() => resendVerficationMail()}
                >
                  CLICK HERE
                </strong>{" "}
                to resend verification mail.
              </p>
            </div>
          </section>
        )}
        <section className={`${styles.otherinfo}`}>
          <div className={`container`}>
            <div className={`row`}>
              <div className={`col-md-4 col-sm-12 mb-2`}>
                <div className={`card`}>
                  <div className={`card-header text-uppercase`}>
                    <h4 className={`font-weight-bold heading`}>Contact Info</h4>
                  </div>
                  <div
                    className={`card-body ${styles.contactbody}`}
                    style={{ fontSize: `1.5rem` }}
                  >
                    <div className={`row`}>
                      <div className={`col-2`}>
                        <IconContext.Provider value={{ color: "" }}>
                          <div>
                            <AiOutlineMail />
                          </div>
                        </IconContext.Provider>
                      </div>
                      <div className={`col-10`}>
                        <a href={`mailto:${userInfo.email}`}>
                          {userInfo.email}
                        </a>
                      </div>
                    </div>
                    {userInfo.linkedin && (
                      <div className={`row`}>
                        <div className={`col-2`}>
                          <IconContext.Provider value={{ color: `#0274B3` }}>
                            <div>
                              <FaLinkedin />
                            </div>
                          </IconContext.Provider>
                        </div>
                        <div className={`col-10`}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                              userInfo.linkedin.startsWith("https://www")
                                ? `${userInfo.linkedin}`
                                : `https://www.${userInfo.linkedin}`
                            }
                          >
                            {userInfo.linkedin}
                          </a>
                        </div>
                      </div>
                    )}
                    {userInfo.instagram && (
                      <div className={`row`}>
                        <div className={`col-2`}>
                          <IconContext.Provider value={{ color: `#BD227A` }}>
                            <div>
                              <FaInstagram />
                            </div>
                          </IconContext.Provider>
                        </div>
                        <div className={`col-10`}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.instagram.com/${userInfo.instagram}`}
                          >
                            {userInfo.instagram}
                          </a>
                        </div>
                      </div>
                    )}
                    {userInfo.twitter && (
                      <div className={`row`}>
                        <div className={`col-2`}>
                          <IconContext.Provider value={{ color: `#55ADEE` }}>
                            <div>
                              <FaTwitter />
                            </div>
                          </IconContext.Provider>
                        </div>
                        <div className={`col-10`}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.twitter.com/${userInfo.twitter}`}
                          >
                            {userInfo.twitter}
                          </a>
                        </div>
                      </div>
                    )}
                    {userInfo.github && (
                      <div className={`row`}>
                        <div className={`col-2`}>
                          <IconContext.Provider value={{ color: `#171515` }}>
                            <div>
                              <FaGithub />
                            </div>
                          </IconContext.Provider>
                        </div>
                        <div className={`col-10`}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://www.github.com/${userInfo.github}`}
                          >
                            {userInfo.github}
                          </a>
                        </div>
                      </div>
                    )}
                    {userInfo.contactNumber && (
                      <div className={`row`}>
                        <div className={`col-2`}>
                          <IconContext.Provider value={{ color: `black` }}>
                            <div>
                              <FcPhone />
                            </div>
                          </IconContext.Provider>
                        </div>
                        <div className={`col-10`}>
                          <a href={`tel:${userInfo.contactNumber}`}>
                            {userInfo.contactNumber}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={`col-md-8 col-sm-12 mb-2`}>
                <div className={`card`}>
                  <div className={`card-header text-uppercase`}>
                    <h4 className={`font-weight-bold heading`}>
                      Other details
                    </h4>
                  </div>
                  <div className={`card-body`}>
                    <section className={`${styles.aboutSection}`}>
                      <h3 className={``}>Bio</h3>
                      <p className={`text-muted lead`}>
                        {userInfo.about
                          ? userInfo.about
                          : `${userInfo.name} has not made his bio.`}
                      </p>
                    </section>
                    <hr />
                    <section className={`${styles.articleSection}`}>
                      <h3 className={``}>
                        Articles {` `}
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <FaRegNewspaper />
                        </IconContext.Provider>
                      </h3>
                      <div className={`text-muted lead`}>
                        {userInfo.username === tokenDetails.username && (
                          <p>
                            <Link href={`../../articles/create`}>
                              <a className={`btn btn-outline-info`}>
                                <IconContext.Provider
                                  value={{ size: "1.2rem" }}
                                >
                                  <MdCreate />
                                  {` `}Create Article
                                </IconContext.Provider>
                              </a>
                            </Link>
                          </p>
                        )}
                        {showArticles()}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
const UserProfile = (props) => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedUserProfile userDetails={props.userDetails} />
    </ToastProvider>
  );
};

export default UserProfile;
