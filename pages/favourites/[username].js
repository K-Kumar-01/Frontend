import React, { useEffect } from "react";
import Error from "next/error";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getFavourites } from "../../actions/user";
import Favourites from "../../components/user/Favourites";
import ErrorPage403 from "../../components/errorPages/403/ErrorPage403";

const FavouritesPage = (props) => {
  return (
    <React.Fragment>
      {props.error ? (
        props.error === 401 || props.error === 403 ? (
          <ErrorPage403 error={props.error}/>
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <Layout>
          <Header sidebar>
            <Favourites favs={props.favourites} />
          </Header>
          <Footer />
        </Layout>
      )}
    </React.Fragment>
  );
};

FavouritesPage.getInitialProps = async (props) => {
  let response;
  let token = props.req.headers.cookie;
  token = token && token.split("=")[1];
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
