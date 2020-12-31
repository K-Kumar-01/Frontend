import React from "react";
import Error from "next/error";
import Head from "next/head";

import UserProfile from "../../../components/user/UserProfile";
import Layout from "../../../components/Layout";
import ErrorPage404 from "../../404";
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
        props.error === 404 ? (
          <ErrorPage404 />
        ) : (
          <Error statusCode={props.error} />
        )
      ) : (
        <React.Fragment>
          {head()}
          <Layout>
            <UserProfile userDetails={props.userDetails} />
          </Layout>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export async function getServerSideProps(props) {
  let response;
  try {
    response = await getUserDetails(props.query.username);
  } catch (error) {
    return { props: { error: 500 } };
  }

  if (response.error) {
    return { props: { error: response.error.status } };
  } else {
    return { props: { userDetails: response.response.data || null } };
  }
}

export default UserIndex;
