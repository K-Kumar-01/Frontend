import React, { useState, useEffect } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Link from "next/link";

import { IconContext } from "react-icons";
import { FaEdit } from "react-icons/fa";

import styles from "./SingleHelp.module.css";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

const ToastedComponentSingleHelp = (props) => {
  const { addToast } = useToasts();
  const { request } = props;

  const [tokenDetails, setTokenDetails] = useState(false);

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
  }, []);

  const giveStatus = (data) => {
    switch (data) {
      case "OPEN":
        return "text-success";
      case "CLOSED":
        return "text-danger";
      case "PENDING":
        return "text-warning";
      default:
        return "text-info";
    }
  };

  return (
    <section style={{ minHeight: "70vh" }}>
      <div className={`container`}>
        <div className={`d-flex justify-content-between`}>
          <h2 className={`heading text-capitalize`}>Request Details</h2>
          {tokenDetails.username === request.postedBy.username && (
            <IconContext.Provider value={{ size: "2rem", color: "#17A2B8" }}>
              <div title="Edit" style={{ cursor: "pointer" }}>
                <FaEdit />
              </div>
            </IconContext.Provider>
          )}
        </div>
        <hr />
        <div className={`row`}>
          <div className={`col-3`}>
            <h4>
              <strong>Title</strong>
            </h4>
          </div>
          <div className={`col-9 ${styles.changedFont}`}>
            <h4>{request.title}</h4>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-3`}>
            <p>
              <strong>Description</strong>
            </p>
          </div>
          <div className={`col-9 ${styles.changedFont}`}>
            <p>{request.desc}</p>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-3`}>
            <p>
              <strong>Requested By</strong>
            </p>
          </div>
          <div className={`col-9 ${styles.changedFont}`}>
            <p>
              <Link href={`/user/profile/${request.postedBy.username}`}>
                <a className={`${styles.link}`}>{request.postedBy.name}</a>
              </Link>
            </p>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-3`}>
            <p>
              <strong>Created</strong>
            </p>
          </div>
          <div className={`col-9 ${styles.changedFont}`}>
            <p>{new Date(request.createdAt).toDateString()}</p>
          </div>
        </div>
        <div className={`row`}>
          <div className={`col-3`}>
            <h4>
              <strong className={`text-uppercase`}>Status</strong>
            </h4>
          </div>
          <div className={`col-9 ${styles.changedFont}`}>
            <h4 className={`text-capitalize ${giveStatus(request.status)}`}>
              {request.status}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

const SingleHelp = (props) => {
  return (
    <ToastProvider>
      <ToastedComponentSingleHelp request={props.request} />
    </ToastProvider>
  );
};

export default SingleHelp;
