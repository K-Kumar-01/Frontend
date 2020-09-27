import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "react-icons/fa";

import styles from "./UserProfile.module.css";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

const UserProfile = (props) => {
  const [tokenDetails, setTokenDetails] = useState(false);
  useEffect(() => {
    setTokenDetails(authenticate(COOKIE_NAME));
    console.log(props);
  }, []);

  const { userInfo } = props.userDetails;

  const renderArticles = (data) =>
    data.map((d) => (
      <section key={d._id} className={`${styles.articlearea}`}>
        <Link href={`/${d.slug}`}>
          <a>
            <h5 className={`${styles.headLink}`}>
              <FaAngleRight />
              {d.title}
            </h5>
          </a>
        </Link>
        <p className={`h6 d-none d-md-block`}>{d.mdesc}</p>
        <br />
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
      <main className={`${styles.maincontainer}`}>
        <section className={`${styles.basicinfo}`}>
          <div className={`w-100 ${styles.profile}`}>
            <div className={`${styles.backgroundCover} col-12`}></div>
            <div className={`container`}>
              <div className={`row `}>
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
                      <p className={`text-muted lead`}>{userInfo.about}</p>
                    </section>
                    <hr />
                    <section className={`${styles.articleSection}`}>
                      <h3 className={``}>
                        Articles {` `}
                        <IconContext.Provider value={{ size: "2rem" }}>
                          <FaRegNewspaper />
                        </IconContext.Provider>
                      </h3>
                      <p className={`text-muted lead`}>
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
                      </p>
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

export default UserProfile;
