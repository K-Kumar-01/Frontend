import React from "react";
import Error from "next/error";
import Head from "next/head";

import Layout from "../../components/Layout";
import Help from "../../components/help/Help";
import { getAllRequests } from "../../actions/help";
import { DOMAIN } from "../../appConstants";

const HelpPage = (props) => {
  const arrays = {
    open: props.requests.open || [],
    closed: props.requests.closed || [],
    pending: props.requests.pending || [],
  };

  const head = () => (
    <Head>
      <title>Help | TITAN READ</title>
      <meta
        name="description"
        content={`The page is made to help the users. One can request articles on this page`}
      />
      <link rel="canonical" href={`${DOMAIN}/help`} />
      <meta property="og:title" content={`HELP | TITAN READ`} />
      <meta
        property="og:description"
        content={`The page is made to help the users. One can request articles on this page`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/help`} />
      <meta property="og:site_name" content={`TITAN READ`} />
    </Head>
  );
  return (
    <div>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <React.Fragment>
          {head()}
          <Layout headerSidebar={true}>
            <Help
              open={arrays.open}
              closed={arrays.closed}
              pending={arrays.pending}
            />
          </Layout>
        </React.Fragment>
      )}
    </div>
  );
};

HelpPage.getInitialProps = async () => {
  let response;
  try {
    response = await getAllRequests();
  } catch (error) {
    return { error: 500 };
  }

  if (response.error) {
    return { error: response.error.status };
  } else {
    let w = response.requests;
    let open = [],
      closed = [],
      pending = [];
    for (let i = 0; i < w.length; i++) {
      if (w[i].status === "OPEN") {
        open.push(w[i]);
      } else if (w[i].status === "CLOSED") {
        closed.push(w[i]);
      } else {
        pending.push(w[i]);
      }
    }
    return { requests: { open, closed, pending } };
  }
};

export default HelpPage;
