import React, { useEffect } from "react";
import Link from "next/link";

const ErrorPage404 = () => {
  return (
    <div className="errorContainer">
      <nav className="shelf">
        <Link href={`/`}>
          <a className="book home-page">Home page</a>
        </Link>
        <Link href={`/articles`}>
          <a className="book about-us">Articles</a>
        </Link>
        <Link href={`/membership`}>
          <a className="book contact">Membership</a>
        </Link>
        <Link href={`/help`}>
          <a className="book faq">Help</a>
        </Link>

        <span className="book not-found"></span>

        <span className="door left"></span>
        <span className="door right"></span>
      </nav>
      <h1>Error 404</h1>
      <p>The page you're looking for can't be found</p>
    </div>
  );
};

export default ErrorPage404;
