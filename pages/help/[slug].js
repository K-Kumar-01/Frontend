import React from "react";
import Error from "next/error";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchSingleRequest } from "../../actions/help";
import SingleHelp from "../../components/help/SingleHelp";

const SingleHelpPage = (props) => {
  return (
    <div>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <Layout>
          <Header sidebar>
            <SingleHelp request={props.request} />
          </Header>
          <Footer />
        </Layout>
      )}
    </div>
  );
};

SingleHelpPage.getInitialProps = async (props) => {
  let response;
  try {
    response = await fetchSingleRequest(props.query.slug);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { request: response.request };
  }
};

export default SingleHelpPage;
