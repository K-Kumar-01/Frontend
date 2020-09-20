import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FcAndroidOs, FcHome } from "react-icons/fc";

import { authenticate, removeCookie } from "../helpers/auth";
import { COOKIE_NAME } from "../appConstants";
import { logoutUser } from "../actions/auth";
import { useRouter } from "next/router";
import styles from "./Header.module.css";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [drawerPos, setDrawerPos] = useState(0);
  const [drawerClass, setDrawerClass] = useState([]);
  const [mainClass, setMainClass] = useState([]);

  useEffect(() => {
    setLoggedIn(authenticate(COOKIE_NAME));
    console.log(props);
  }, []);

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
      console.log(z);
      w += `${z} `;
    });
    return w;
  };

  return (
    <div className={`${styles.App}`}>
      <nav className="navbar navbar-expand-lg navbar-top navbar-light bg-light sticky-top">
        <div className="container">
          {props.sidebar ? (
            <i className="material-icons" onClick={handleDrawer}>
              menu
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
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item">
                <Link href="/membership">
                  <button className={`${styles.link} btn`}>Subscribe</button>
                </Link>
              </li>

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
            <ul>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcHome />
                  </IconContext.Provider>
                </i>
                <Link href="/">
                  <a className={`navbar-brand ${styles.link}`}>Titan Read</a>
                </Link>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcAndroidOs />
                  </IconContext.Provider>
                </i>
                <span>Technology</span>
              </li>
              <li>
                <i className="material-icons">show_chart</i>
                <span>Sales</span>
              </li>
              <li>
                <i className="material-icons">table_chart</i>
                <span>Others</span>
              </li>
            </ul>
          </aside>
          <main className={makeClassNameString(mainClass)}>
            {props.children}
          </main>
        </>
      )}
    </div>
  );
};

export default Header;
