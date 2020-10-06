import React from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Link from "next/link";

import styles from "./SingleHelp.module.css"

const ToastedComponentSingleHelp = (props) => {
  const { addToast } = useToasts();
  const { request } = props;
  return (
    <section style={{ minHeight: "70vh" }}>
      <div className={`container`}>
        <h2 className={`heading text-capitalize`}>Request Details</h2>
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
