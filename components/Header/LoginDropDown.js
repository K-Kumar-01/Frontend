import Link from "next/link";
import Image from "next/image";
import styles from "./LoginDropDown.module.css";
import { IconContext } from "react-icons";
import { RiLogoutBoxRLine } from "react-icons/ri";

const LoginDropDown = ({ loggedIn, logout }) => {
  return (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Image
          src={loggedIn.avatar}
          className={`${styles.avatar}`}
          width={35}
          height={35}
        />
      </span>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link
          href="/user/edit/[username]"
          as={`/user/edit/${loggedIn.username}`}
        >
          <a className="dropdown-item">Profile</a>
        </Link>
        <Link
          href="/user/profile/[username]"
          as={`/user/profile/${loggedIn.username}`}
        >
          <a className="dropdown-item">Dashboard</a>
        </Link>
        <Link href="/articles/create" as={`/articles/create`}>
          <a className="dropdown-item">Create Article</a>
        </Link>
        <Link
          href="/favourites/[username]"
          as={`/favourites/${loggedIn.username}`}
        >
          <a className="dropdown-item">My Favourites</a>
        </Link>
        <Link
          href="/user/articles/[username]"
          as={`/user/articles/${loggedIn.username}`}
        >
          <a className="dropdown-item">My Posts</a>
        </Link>
        <div className="dropdown-divider"></div>

        <button className="dropdown-item" onClick={logout}>
          <IconContext.Provider value={{ size: "1.1rem" }}>
            <RiLogoutBoxRLine />
          </IconContext.Provider>
          {` `}Logout
        </button>
      </div>
    </li>
  );
};

export default LoginDropDown;
