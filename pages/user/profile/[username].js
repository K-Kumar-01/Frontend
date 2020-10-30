import React, { useEffect } from "react";
import Error from "next/error";
import Head from "next/head";

import UserProfile from "../../../components/user/UserProfile";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";
import { getUserDetails } from "../../../actions/user";
import { DOMAIN } from "../../../appConstants";

const UserIndex = (props) => {
  const head = () => {
    let data = null;
    if (props.userDetails) {
      data = props.userDetails.userInfo;
    }
    return (
      <Head>
        <title>{`${data.username} (${data.name})`}</title>
        <meta name="description" content={`Profile of ${data.username}`} />
        <link
          rel="canonical"
          href={`${DOMAIN}/user/profile/${data.username}`}
        />
        <meta property="og:title" content={`${data.username} | TITAN READ`} />
        <meta
          property="og:description"
          content={`Profile of ${data.username}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/user/profile/${data.username}`}
        />
        <meta property="og:site_name" content="TITAN READ" />

        <meta property="og:image" content={`${data.avatar}`} />
        <meta property="og:image:secure_url" content={`${data.avatar}`} />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {props.error ? (
        <Error statusCode={props.error} />
      ) : (
        <React.Fragment>
          {head()}
          <Layout>
            <Header></Header>
            <UserProfile userDetails={props.userDetails} />
            <Footer></Footer>
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

UserIndex.getInitialProps = async (props) => {
  let response;

  try {
    response = await getUserDetails(props.query.username);
    // console.log(response);
  } catch (error) {
    // console.log(error);
    return { error: 500 };
  }

  if (response.error) {
    return { error: response.error.status };
  } else {
    return { userDetails: response.response.data };
  }
};

export default UserIndex;
