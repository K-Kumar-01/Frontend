import React from "react";
import Error from "next/error";
import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import SingleHelp from "../../components/help/SingleHelp";
import ErrorPage404 from "../404";
import { fetchSingleRequest } from "../../actions/help";
import { DOMAIN } from "../../appConstants";

const SingleHelpPage = (props) => {
  const router = useRouter();
  
  const head = () => (
    <Head>
      <title>{`Requested Article: ${router.query.slug}`}</title>
      <meta
        name="description"
        content={`Article requested: ${router.query.slug}. Description: ${props.request.desc}`}
      />
      <link rel="canonical" href={`${DOMAIN}/help/${router.query.slug}`} />
      <meta
        property="og:title"
        content={`Requested Article: ${router.query.slug}`}
      />
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
        props.error === 404 ? (
          <ErrorPage404 />
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <React.Fragment>
          {head()}
          <Layout headerSidebar={true}>
              <SingleHelp request={props.request} />
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
