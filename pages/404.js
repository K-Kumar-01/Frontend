import React from "react";
import Link from "next/link";
import Head from "next/head";

const ErrorPage404 = () => {
  const head = () => (
    <Head>
      <title>Page Not found | TITAN READ</title>
      <meta
        name="description"
        content={`We are unable to find the requested page. Try searching a different URL.`}
      />
      <meta property="og:title" content={`Page Not Found | TITAN READ`} />
      <meta
        property="og:description"
        content={`We are unable to find the requested page. Try searching a different URL.`}
      />
    </Head>
  );

  return (
    <React.Fragment>
      {head()}
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
    </React.Fragment>
  );
};

export default ErrorPage404;
