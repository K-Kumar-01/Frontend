import React, { useEffect, useState } from "react";
import Error from "next/error";

import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Help from "../../components/help/Help";
import { getAllRequests } from "../../actions/help";

const HelpPage = (props) => {
  const [arrays, setArrays] = useState({
    open: props.requests.open || [],
    closed: props.requests.closed || [],
    pending: props.requests.pending || [],
  });
  useEffect(() => {}, []);
  return (
    <div>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <Layout>
          <Header sidebar>
            <Help
              open={arrays.open}
              closed={arrays.closed}
              pending={arrays.pending}
            />
          </Header>
          <Footer />
        </Layout>
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
