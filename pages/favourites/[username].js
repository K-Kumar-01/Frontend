import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";

import Layout from "../../components/Layout";
import Favourites from "../../components/user/Favourites";
import ErrorPage403 from "../../components/errorPages/403/ErrorPage403";
import { getFavourites } from "../../actions/user";
import { DOMAIN } from "../../appConstants";

const FavouritesPage = (props) => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>Favourited Articles of {router.query.username}</title>
      <meta
        name="description"
        content={`The page contains the articles which are favourited by the user ${router.query.username}`}
      />
      <link
        rel="canonical"
        href={`${DOMAIN}/favourites/${router.query.username}`}
      />
      <meta
        property="og:title"
        content={`Favourited Articles of ${router.query.username}`}
      />
      <meta
        property="og:description"
        content={`The page contains the articles which are favourited by the user ${router.query.username}`}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${DOMAIN}/favourites/${router.query.username}`}
      />
      <meta property="og:site_name" content="TITAN READ" />
    </Head>
  );

  return (
    <React.Fragment>
      {props.error ? (
        props.error === 401 || props.error === 403 ? (
          <ErrorPage403 error={props.error} />
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <React.Fragment>
          {head()}
          <Layout headerSidebar={true}>
            <Favourites favs={props.favourites} />
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

FavouritesPage.getInitialProps = async (props) => {
  let response;
  let token = props.req?.headers?.cookie || "NA";
  let index = token.search("token=");
  if (index == -1) {
    return { error: 401 };
  }
  token = token.substring(index);
  token = token.split("=")[1];
  if (!token) {
    return { error: 401 };
  }
  try {
    response = await getFavourites(props.query.username, token);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return {
      favourites: response.articles,
    };
  }
};

export default FavouritesPage;
