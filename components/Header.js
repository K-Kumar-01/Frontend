import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {
  FcAndroidOs,
  FcHome,
  FcIdea,
  FcSportsMode,
  FcBullish,
  FcFilmReel,
  FcCommandLine,
  FcButtingIn,
  FcGraduationCap,
  FcSpeaker,
  FcGoogle,
  FcBriefcase,
  FcCurrencyExchange,
  FcComboChart,
  FcAddDatabase,
  FcFlowChart,
  FcSteam,
  FcFolder,
  FcOpenedFolder,
  FcGallery,
} from "react-icons/fc";
import { GiPopcorn } from "react-icons/gi";
import {
  FaHamburger,
  FaPray,
  FaTree,
  FaVenusMars,
  FaPlane,
  FaSpaceShuttle,
  FaHospital,
  FaTimes,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { ToastProvider, useToasts } from "react-toast-notifications";

import { authenticate, removeCookie } from "../helpers/auth";
import { COOKIE_NAME } from "../appConstants";
import { logoutUser } from "../actions/auth";

import styles from "./Header.module.css";
import ArticleCard from "./articles/ArticleCard";
import LoadingSpinner from "./spinner/LoadingSpinner";
import { searchArticles } from "../actions/article";

const ToastedHeader = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawerPos, setDrawerPos] = useState(0);
  const [drawerClass, setDrawerClass] = useState([]);
  const [mainClass, setMainClass] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);

  useEffect(() => {
    setLoggedIn(authenticate(COOKIE_NAME));
  }, []);

  const { addToast } = useToasts();

  useEffect(() => {
    if (drawerPos === 1) {
      setDrawerClass([...drawerClass, "drawerMin"]);
      setMainClass([...mainClass, "mainMin"]);
    } else if (drawerPos === 2) {
      setDrawerClass([...drawerClass, "drawerOpen"]);
      setMainClass([...mainClass, "mainOpen"]);
    } else {
      setDrawerClass([]);
      setMainClass([]);
    }
  }, [drawerPos]);

  const router = useRouter();

  const handleDrawer = () => {
    setDrawerPos((drawerPos + 1) % 3);
  };

  const logout = async () => {
    let response;
    try {
      response = await logoutUser();
      if (response.error) {
        console.log(error);
      } else {
        removeCookie(COOKIE_NAME);
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makeClassNameString = (data) => {
    let w = "";
    data.forEach((d) => {
      let z = styles[`${d}`];
      w += `${z} `;
    });
    return w;
  };

  const showDrawer = () => {
    return (
      <ul>
        <Link href="/">
          <a title="Home">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcHome />
              </IconContext.Provider>
            </i>
            <span className={`navbar-brand ${styles.link}`}>Titan Read</span>
          </a>
        </Link>
        <Link href={`/category/technology`}>
          <a title="Technology">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcAndroidOs />
              </IconContext.Provider>
            </i>
            <span>Technology</span>
          </a>
        </Link>
        <Link href={`/category/science`}>
          <a title="Science">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcIdea />
              </IconContext.Provider>
            </i>
            <span>Science</span>
          </a>
        </Link>
        <Link href={`/category/sports`}>
          <a title="Sports">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcSportsMode />
              </IconContext.Provider>
            </i>
            <span>Sports</span>
          </a>
        </Link>
        <Link href={`/caetgory/business`}>
          <a title="Business">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcBullish />
              </IconContext.Provider>
            </i>
            <span>Business</span>
          </a>
        </Link>
        <Link href={`/category/media`}>
          <a title="Media">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcFilmReel />
              </IconContext.Provider>
            </i>
            <span>Media</span>
          </a>
        </Link>
        <Link href={`/category/programming`}>
          <a title="Programming">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcCommandLine />
              </IconContext.Provider>
            </i>
            <span>Programming</span>
          </a>
        </Link>
        <Link href={`/category/gaming`}>
          <a title="Gaming">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcSteam />
              </IconContext.Provider>
            </i>
            <span>Gaming</span>
          </a>
        </Link>
        <Link href={`/caetgory/psychology`}>
          <a title="Psychology">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcButtingIn />
              </IconContext.Provider>
            </i>
            <span>Psychology</span>
          </a>
        </Link>
        <Link href={`/category/education`}>
          <a title="Education">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcGraduationCap />
              </IconContext.Provider>
            </i>
            <span>Education</span>
          </a>
        </Link>
        <Link href={`/category/politics`}>
          <a title="Politics">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcSpeaker />
              </IconContext.Provider>
            </i>
            <span>Politics</span>
          </a>
        </Link>
        <Link href={`/category/world`}>
          <a title="World">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcGoogle />
              </IconContext.Provider>
            </i>
            <span>World</span>
          </a>
        </Link>
        <Link href={`/category/startups`}>
          <a title="Startups">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcBriefcase />
              </IconContext.Provider>
            </i>
            <span>Startups</span>
          </a>
        </Link>
        <Link href={`/category/history`}>
          <a title="History">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcFlowChart />
              </IconContext.Provider>
            </i>
            <span>History</span>
          </a>
        </Link>
        <Link href={`/category/fashion`}>
          <a title="Fashion">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcGallery />
              </IconContext.Provider>
            </i>
            <span>Fashion</span>
          </a>
        </Link>
        <Link href={`/category/cryptocurrency`}>
          <a title="Cryptocurrency">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcCurrencyExchange />
              </IconContext.Provider>
            </i>
            <span>Cryptocurrency</span>
          </a>
        </Link>
        <Link href={`/category/marketing`}>
          <a title="Marketing">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcComboChart />
              </IconContext.Provider>
            </i>
            <span>Marketing</span>
          </a>
        </Link>
        <Link href={`/category/entertainment`}>
          <a title="Entertainment">
            <i>
              <IconContext.Provider value={{ size: "2rem", color: "bisque" }}>
                <GiPopcorn />
              </IconContext.Provider>
            </i>
            <span>Entertainment</span>
          </a>
        </Link>
        <Link href={`/category/health`}>
          <a title="Health">
            <i>
              <IconContext.Provider value={{ size: "2rem", color: "#F7C6C5" }}>
                <FaHospital />
              </IconContext.Provider>
            </i>
            <span>Health</span>
          </a>
        </Link>
        <Link href={"/category/travel"}>
          <a title="Travel">
            <i>
              <IconContext.Provider
                value={{ size: "2rem", color: "lightgray" }}
              >
                <FaPlane />
              </IconContext.Provider>
            </i>
            <span>Travel</span>
          </a>
        </Link>
        <Link href={`/category/food`}>
          <a title="Food">
            <i>
              <IconContext.Provider
                value={{ size: "2rem", color: "rgb(223, 181, 142)" }}
              >
                <FaHamburger />
              </IconContext.Provider>
            </i>
            <span>Food</span>
          </a>
        </Link>
        <Link href={`/category/sexuality`}>
          <a title="Sexuality">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FaVenusMars />
              </IconContext.Provider>
            </i>
            <span>Sexuality</span>
          </a>
        </Link>
        <Link href={`/category/nature`}>
          <a title="Nature">
            <i>
              <IconContext.Provider
                value={{ size: "2rem", color: "rgb(18, 159, 75)" }}
              >
                <FaTree />
              </IconContext.Provider>
            </i>
            <span>Nature</span>
          </a>
        </Link>
        <Link href={`/category/spirituality`}>
          <a title="Spirituality">
            <i>
              <IconContext.Provider
                value={{ size: "2rem", color: "floralwhite" }}
              >
                <FaPray />
              </IconContext.Provider>
            </i>
            <span>Spirituality</span>
          </a>
        </Link>
        <Link href={`/category/space`}>
          <a title="Space">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FaSpaceShuttle />
              </IconContext.Provider>
            </i>
            <span>Space</span>
          </a>
        </Link>
        <Link href={`/category/others`}>
          <a title="Others">
            <i>
              <IconContext.Provider value={{ size: "2rem" }}>
                <FcAddDatabase />
              </IconContext.Provider>
            </i>
            <span>Others</span>
          </a>
        </Link>
      </ul>
    );
  };

  const renderSearchArea = () => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.4,
          },
        },
      }}
    >
      <section className={`container mt-4`}>
        <div className={`row ${styles.changedFont}`}>
          <div className={`col-10 col-md-9`}>
            <p>
              Showing results for <strong>{searchedQuery}</strong>
            </p>
          </div>
          <div className={`col-2 col-md-3 text-right`}>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowSearch(false);
                setSearchText("");
                setSearchedQuery("");
                setSearchedArticles([]);
              }}
            >
              <span title="Reset Search">
                <IconContext.Provider value={{ size: "2rem" }}>
                  <FaTimes />
                </IconContext.Provider>
              </span>
              <span className={`d-none d-lg-inline ml-2`}>Reset Search</span>
            </p>
          </div>
        </div>
        <ArticleCard articles={searchedArticles} />
      </section>
    </motion.div>
  );

  const fetchSearchedArticles = async (textToSearch) => {
    let response;
    setLoading(true);
    try {
      response = await searchArticles(textToSearch);
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        setShowSearch(true);
        console.log(response.foundArticles);
        setSearchedArticles(response.foundArticles);
      }
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className={`${styles.App}`}>
      {loading && <LoadingSpinner asOverlay />}
      <nav className="navbar navbar-expand-lg navbar-top navbar-light bg-light sticky-top">
        <div className="container">
          {props.sidebar ? (
            <i className="material-icons" onClick={handleDrawer}>
              <IconContext.Provider value={{ size: "2rem" }}>
                {drawerPos ? <FcOpenedFolder /> : <FcFolder />}
              </IconContext.Provider>
            </i>
          ) : (
            <Link href="/">
              <a className="navbar-brand">Titan Read</a>
            </Link>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex align-items-center text-left">
              <li className="nav-item">
                <Link href="/membership">
                  <a className={`${styles.link} btn`}>Subscribe</a>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/help">
                  <a className={`${styles.link} btn`}>Help</a>
                </Link>
              </li>

              {props.search && (
                <li className="nav-item searchBar" title="Search Articles">
                  <form
                    id="demo-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchText === "") {
                        addToast(`Invalid Search text`, {
                          appearance: "error",
                          autoDismiss: true,
                        });
                        return;
                      }
                      setSearchedQuery(searchText);
                      fetchSearchedArticles(searchText);
                    }}
                  >
                    <input
                      value={searchText}
                      type="search"
                      placeholder="Search"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                  </form>
                </li>
              )}

              {loggedIn ? (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={loggedIn.avatar} className={`${styles.avatar}`} />
                  </span>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link href={`/user/edit/${loggedIn.username}`}>
                      <a className="dropdown-item">Profile</a>
                    </Link>
                    <Link href={`/user/profile/${loggedIn.username}`}>
                      <a className="dropdown-item">Dashboard</a>
                    </Link>
                    <a className="dropdown-item" href="#">
                      My Posts
                    </a>
                    <div className="dropdown-divider"></div>

                    <button className="dropdown-item" onClick={logout}>
                      <IconContext.Provider value={{ size: "1.1rem" }}>
                        <RiLogoutBoxRLine />
                      </IconContext.Provider>
                      {` `}Logout
                    </button>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link href="/signup">
                    <button className={`btn btn-outline-success`}>
                      Get Started
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {props.sidebar && (
        <>
          <aside className={makeClassNameString(drawerClass)}>
            {showDrawer()}
          </aside>
          <main className={makeClassNameString(mainClass)}>
            {showSearch ? (
              <section style={{ minHeight: "73vh" }}>
                {renderSearchArea()}
              </section>
            ) : (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      when: "beforeChildren",
                      staggerChildren: 0.5,
                    },
                  },
                  hidden: {
                    opacity: 0,
                    transition: {
                      when: "afterChildren",
                    },
                  },
                }}
              >
                {props.children}
              </motion.section>
            )}
          </main>
        </>
      )}
    </div>
  );
};

const Header = (props) => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedHeader {...props} />
    </ToastProvider>
  );
};

export default Header;
