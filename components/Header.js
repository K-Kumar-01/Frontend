import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  FcGlobe,
  FcBriefcase,
  FcLandscape,
  FcCurrencyExchange,
  FcComboChart,
  FcAddDatabase,
  FcFlowChart,
  FcSteam,
  FcFolder,
  FcOpenedFolder,
  FcGallery,
} from "react-icons/fc";
import { GiCaduceus, GiPopcorn } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import {
  FaHamburger,
  FaPray,
  FaTree,
  FaVenusMars,
  FaPlane,
  FaSpaceShuttle,
  FaShoppingBag,
  FaHospital,
} from "react-icons/fa";

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
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcIdea />
                  </IconContext.Provider>
                </i>
                <span>Science</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcSportsMode />
                  </IconContext.Provider>
                </i>
                <span>Sports</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcBullish />
                  </IconContext.Provider>
                </i>
                <span>Business</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcFilmReel />
                  </IconContext.Provider>
                </i>
                <span>Media</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcCommandLine />
                  </IconContext.Provider>
                </i>
                <span>Programming</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcSteam />
                  </IconContext.Provider>
                </i>
                <span>Gaming</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcButtingIn />
                  </IconContext.Provider>
                </i>
                <span>Psychology</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcGraduationCap />
                  </IconContext.Provider>
                </i>
                <span>Education</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcSpeaker />
                  </IconContext.Provider>
                </i>
                <span>Politics</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcGoogle />
                  </IconContext.Provider>
                </i>
                <span>World</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcBriefcase />
                  </IconContext.Provider>
                </i>
                <span>Startups</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcFlowChart />
                  </IconContext.Provider>
                </i>
                <span>History</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcGallery />
                  </IconContext.Provider>
                </i>
                <span>Fashion</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcCurrencyExchange />
                  </IconContext.Provider>
                </i>
                <span>Cryptocurrency</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcComboChart />
                  </IconContext.Provider>
                </i>
                <span>Marketing</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "bisque" }}
                  >
                    <GiPopcorn />
                  </IconContext.Provider>
                </i>
                <span>Entertainment</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "#F7C6C5" }}
                  >
                    <FaHospital />
                  </IconContext.Provider>
                </i>
                <span>Health</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "lightgray" }}
                  >
                    <FaPlane />
                  </IconContext.Provider>
                </i>
                <span>Travel</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "rgb(223, 181, 142)" }}
                  >
                    <FaHamburger />
                  </IconContext.Provider>
                </i>
                <span>Food</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FaVenusMars />
                  </IconContext.Provider>
                </i>
                <span>Sexuality</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "rgb(18, 159, 75)" }}
                  >
                    <FaTree />
                  </IconContext.Provider>
                </i>
                <span>Nature</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider
                    value={{ size: "2rem", color: "floralwhite" }}
                  >
                    <FaPray />
                  </IconContext.Provider>
                </i>
                <span>Spirituality</span>
              </li>
              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FaSpaceShuttle />
                  </IconContext.Provider>
                </i>
                <span>Space</span>
              </li>

              <li>
                <i>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <FcAddDatabase />
                  </IconContext.Provider>
                </i>
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
