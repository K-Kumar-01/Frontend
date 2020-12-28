import React, { useEffect, useState } from "react";
import Head from "next/head";
import Error from "next/error";
import { useRouter } from "next/router";

import EditProfile from "../../../components/user/crud/EditProfile";
import Layout from "../../../components/Layout";
import Preloader from "../../../components/spinner/Preloader";
import ErrorPage404 from "../../404";

import { getUserDetails } from "../../../actions/user";
import { authenticate } from "../../../helpers/auth";

import { COOKIE_NAME, DOMAIN } from "../../../appConstants";

const EditUser = (props) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let decodedData = authenticate(COOKIE_NAME);
    setLoggedIn(decodedData);
    if (!decodedData || !decodedData.username) {
      router.push("/signin");
    } else if (!props.error) {
      if (
        decodedData.username.toString() !== router.query.username.toString()
      ) {
        router.push(`/user/edit/${decodedData.username}`);
      }
    }
  }, []);

  const head = () => {
    let data = null;
    if (props.userDetails) {
      data = props.userDetails.userInfo;
    }
    return (
      <Head>
        <title>{`${data.username} (${data.name})`}</title>
        <meta name="description" content={`Details of ${data.username}`} />
        <link rel="canonical" href={`${DOMAIN}/user/edit/${data.username}`} />
        <meta property="og:title" content={`${data.username} | TITAN READ`} />
        <meta
          property="og:description"
          content={`Details of ${data.username}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${DOMAIN}/user/edit/${data.username}`}
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
      {loggedIn ? (
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
              <Layout>
                <EditProfile userDetails={props.userDetails} />
              </Layout>
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>
          <Preloader />
        </div>
      )}
    </React.Fragment>
  );
};

EditUser.getInitialProps = async (props) => {
  let response;

  try {
    response = await getUserDetails(props.query.username);
  } catch (error) {
    return { error: 500 };
  }
  if (response.error) {
    return { error: response.error.status };
  } else {
    return { userDetails: response.response.data };
  }
};

export default EditUser;
