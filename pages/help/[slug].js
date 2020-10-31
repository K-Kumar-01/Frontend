import React from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { fetchSingleRequest } from "../../actions/help";
import SingleHelp from "../../components/help/SingleHelp";
import { DOMAIN } from "../../appConstants";

const SingleHelpPage = (props) => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>{`Reuqested Article: ${router.query.slug}`}</title>
      <meta
        name="description"
        content={`Article requested: ${router.query.slug}. Description: ${props.request.desc}`}
      />
      <link rel="canonical" href={`${DOMAIN}/help/${router.query.slug}`} />
      <meta property="og:title" content={`Reuqested Article: ${router.query.slug}`} />
      <meta
        property="og:description"
        content={`Article requested: ${router.query.slug}. Description: ${props.request.desc}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/help/${router.query.slug}`} />
      <meta property="og:site_name" content="TITAN READ" />
    </Head>
  );

  return (
    <div>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <React.Fragment>
          {head()}
          <Layout>
            <Header sidebar>
              <SingleHelp request={props.request} />
            </Header>
            <Footer />
          </Layout>
        </React.Fragment>
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
