import React from "react";
import Error from "next/error";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const FavouritesPage = (props) => {
  return (
    <React.Fragment>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <Layout>
          <Header></Header>
          <Footer />
        </Layout>
      )}
    </React.Fragment>
  );
};

export default FavouritesPage;
