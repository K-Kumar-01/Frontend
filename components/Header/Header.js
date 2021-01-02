import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { IconContext } from "react-icons";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { HiOutlineEmojiSad } from "react-icons/hi";

import LoadingSpinner from "../spinner/LoadingSpinner";
import ArticleCard from "../articles/ArticleCard";
import { authenticate, removeCookie } from "../../helpers/auth";
import { searchArticles } from "../../actions/article";
import { logoutUser } from "../../actions/auth";
import { COOKIE_NAME } from "../../appConstants";

import styles from "./Header.module.css";

const Drawer = dynamic(() => import("./SideDrawer"), {
  loading: () => (
    <div
      style={{
        position: "relative",
        top: "50%",
        left: "25%",
      }}
    >
      <LoadingSpinner />
    </div>
  ),
});
const DropDown = dynamic(() => import("./LoginDropDown"));

const ToastedHeader = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
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
    setShowDrawer(true);
    setDrawerPos((drawerPos + 1) % 3);
  };

  const logout = async () => {
    let response;
    try {
      response = await logoutUser();
      if (response.error) {
      } else {
        removeCookie(COOKIE_NAME);
        router.push("/signin");
      }
    } catch (error) {}
  };

  const makeClassNameString = (data) => {
    let w = "";
    data.forEach((d) => {
      let z = styles[d];
      w += `${z} `;
    });
    return w;
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
        {searchedArticles.length > 0 ? (
          <ArticleCard articles={searchedArticles} />
        ) : (
          <div>
            <p className={`text-center`}>
              <IconContext.Provider value={{ size: "4rem", color: `#FED15A` }}>
                <HiOutlineEmojiSad />
              </IconContext.Provider>
            </p>
            <p className={`text-center heading ${styles.textChanged}`}>
              Found 0 articles matching the given search.
            </p>
          </div>
        )}
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
            <ul className="navbar-nav ml-auto d-flex text-left align-items-center">
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
                <li
                  className={`nav-item searchBar mr-3 ${styles.searchIcon}`}
                  title="Search Articles"
                >
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
                <DropDown loggedIn={loggedIn} logout={logout} />
              ) : (
                <li className="nav-item">
                  <Link href="/signup">
                    <a className={`btn btn-outline-success`}>Get Started</a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {props.sidebar && (
        <React.Fragment>
          <aside className={makeClassNameString(drawerClass)}>
            {showDrawer && <Drawer />}
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
        </React.Fragment>
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
