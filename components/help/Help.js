import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Link from "next/link";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";

import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";
import styles from "./Help.module.css";
import LoadingSpinner from "../spinner/LoadingSpinner";
import { createRequest } from "../../actions/help";

const ToastedComponent = (props) => {
  const [tokenDetails, setTokenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [arrays, setArrays] = useState({
    closed: props.closed || [],
    open: props.open || [],
    pending: props.pending || [],
  });
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onTouched",
  });
  const router = useRouter();
  const { addToast } = useToasts();

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    $("#createRequest").modal("hide");
    let response;
    setLoading(true);
    try {
      response = await createRequest({
        title: data.title.trim(),
        desc: data.description.trim(),
      });
      setLoading(false);
      if (response.error) {
        addToast(`${response.error}`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(`${response.message}`, {
          appearance: "success",
          autoDismiss: true,
        });
        router.reload();
      }
    } catch (error) {
      setLoading(false);
      addToast(`${error.message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    resetFormState();
  };

  const renderAboutThisPageArea = () => (
    <div>
      <button
        type="button"
        className="btn btn-primary text-capitalize font-weight-bold"
        data-toggle="modal"
        data-target="#aboutusModal"
      >
        Why this page?
      </button>

      <div
        className="modal fade"
        id="aboutusModal"
        tabIndex="-1"
        aria-labelledby="aboutusModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="aboutusModalLabel">
                About
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                This page is created with the aim to request article. If you are
                looking for a article and are unable of find any you can request
                article here. The users can see the request and provide an
                article which might seem suitable or they may create and provide
                its link.
              </p>
              <p>
                If you are providing an article the status of article will get
                changed to pending. If the user who requested the article finds
                it suitable then the request will get closed.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequestForm = () => (
    <>
      <div className={`${styles.formLabelGroup}`}>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Name"
          name="title"
          ref={register({ required: true })}
          autoComplete="off"
          style={errors.title && { border: "1px solid red" }}
        />
        <label htmlFor="title">Title</label>
        <p className={`text-danger ${styles.errors}`}>
          {errors.title?.type === "required" && "Title is required"}
          {errors.title?.type === "pattern" &&
            "Title can only conatin characters numbers and underscores"}
        </p>
      </div>
      <div>
        <label htmlFor="description">
          <h3 className={`heading`}>Description</h3>
        </label>
        <textarea
          name="description"
          rows="4"
          ref={register({ required: true, minLength: 15, maxLength: 100 })}
          placeholder="Description of the request(What you want?)"
          className={`form-control`}
          style={errors.description && { border: "1px solid red" }}
        ></textarea>
        <p className={`text-danger ${styles.errors}`}>
          {errors.description?.type === "required" &&
            "Need a description to create a request"}
          {errors.description?.type === "minLength" &&
            "Must be atleast 15 characters long"}
          {errors.description?.type === "maxLength" &&
            "Must be atmost 100 characters long"}
        </p>
      </div>
    </>
  );

  const renderCreateRequestModal = () => (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#createRequest"
      >
        Create Request
      </button>

      <div
        className="modal fade"
        id="createRequest"
        tabIndex="-1"
        aria-labelledby="createRequestLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center" id="createRequestLabel">
                Create Request
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={resetFormState}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">{renderRequestForm()}</div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className={`btn btn-lg btn-success text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
                  disabled={
                    Object.keys(formState.touched).length < 2 ||
                    Object.keys(errors).length !== 0
                  }
                  // data-dismiss="modal"
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={resetFormState}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const resetFormState = () => {
    reset(
      {
        title: "",
        description: "",
      },
      {
        errors: false,
        dirtyFields: false,
        isDirty: false,
        isSubmitted: false,
        touched: false,
        isValid: false,
        submitCount: false,
      }
    );
  };

  const renderTabs = () => (
    <>
      <ul
        className={`nav nav-tabs pt-4 ${styles.tabs}`}
        id="myTab"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <span
            className="nav-link active text-success heading"
            id="open-tab"
            data-toggle="tab"
            href="#open"
            role="tab"
            aria-controls="open"
            aria-selected="true"
          >
            Open
          </span>
        </li>
        <li className="nav-item" role="presentation">
          <span
            className="nav-link text-warning heading"
            id="pending-tab"
            data-toggle="tab"
            href="#pending"
            role="tab"
            aria-controls="pending"
            aria-selected="false"
          >
            Pending
          </span>
        </li>
        <li className="nav-item" role="presentation">
          <span
            className="nav-link text-danger heading"
            id="closed-tab"
            data-toggle="tab"
            href="#closed"
            role="tab"
            aria-controls="closed"
            aria-selected="false"
          >
            Closed
          </span>
        </li>
      </ul>
    </>
  );

  const renderOpenRequests = (data) =>
    data.map((d, i) => (
      <div className={`row`} key={d._id}>
        <div className={`col-3 col-md-2`}>
          <Link href={`/help/${d.slug}`}>
            <a>{d.title}</a>
          </Link>
        </div>
        <div className={`col-3 col-md-5`}>{d.desc}</div>
        <div className={`col-3 col-md-2`}>
          <Link href={`/user/profile/${d.postedBy.username}`}>
            <a>{d.postedBy.username}</a>
          </Link>
        </div>
        <div className={`col-3 col-md-3`}>
          {new Date(d.createdAt).toDateString()}
        </div>
        {i < data.length - 1 && <hr />}
      </div>
    ));

  const renderPendingorClosedRequests = (data) =>
    data.map((d) => (
      <div className={`row`} key={d._id}>
        <div className={`col-3 col-md-2`}>
          <Link href={`/help/${d.slug}`}>
            <a>{d.title}</a>
          </Link>
        </div>
        <div className={`col-3 col-md-5`}>{d.desc}</div>
        <div className={`col-3 col-md-2`}>
          <Link href={`/user/profile/${d.postedBy.username}`}>
            <a>{d.postedBy.username}</a>
          </Link>
        </div>
        {/* <div className={`col-3 col-md-3`}>
          <Link href={`/articles/${d.closingArticle.slug}`}>
            <a>{d.closingArticle.title}</a>
          </Link>
        </div> */}
      </div>
    ));

  return (
    <React.Fragment>
      {loading && <LoadingSpinner asOverlay />}
      <section style={{ minHeight: "70vh" }}>
        <div className={`container`}>
          <div className={`d-flex justify-content-between`}>
            {renderAboutThisPageArea()}
            {tokenDetails && renderCreateRequestModal()}
          </div>
        </div>
        <div className={`container-fluid px-5`}>
          {renderTabs()}
          <div className="tab-content mt-4" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="open"
              role="tabpanel"
              aria-labelledby="open-tab"
            >
              {arrays.open.length > 0 ? (
                <div className={`row`}>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Title</strong>
                  </div>
                  <div className={`col-3 col-md-5 ${styles.openHeading}`}>
                    <strong>Description</strong>
                  </div>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Requested By</strong>
                  </div>
                  <div className={`col-3 col-md-3 ${styles.openHeading}`}>
                    <strong>Requested On</strong>
                  </div>
                </div>
              ) : (
                <div className={`text-center`}>
                  <IconContext.Provider
                    value={{ color: `#218838`, size: "4rem" }}
                  >
                    <div>
                      <HiOutlineEmojiHappy />
                    </div>
                  </IconContext.Provider>
                  <p className={`h4`}>No open requests as of now.</p>
                </div>
              )}
              {renderOpenRequests(arrays.open)}
            </div>
            <div
              className="tab-pane fade"
              id="pending"
              role="tabpanel"
              aria-labelledby="pending-tab"
            >
              {arrays.pending.length > 0 ? (
                <div className={`row`}>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Title</strong>
                  </div>
                  <div className={`col-3 col-md-5 ${styles.openHeading}`}>
                    <strong>Description</strong>
                  </div>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Requested By</strong>
                  </div>
                  <div className={`col-3 col-md-3 ${styles.openHeading}`}>
                    <strong>Suggested Article</strong>
                  </div>
                </div>
              ) : (
                <div className={`text-center`}>
                  <IconContext.Provider
                    value={{ color: `#218838`, size: "4rem" }}
                  >
                    <div>
                      <HiOutlineEmojiHappy />
                    </div>
                  </IconContext.Provider>
                  <p className={`h4`}>No pending requests as of now.</p>
                </div>
              )}
              {renderPendingorClosedRequests(arrays.pending)}
            </div>
            <div
              className="tab-pane fade"
              id="closed"
              role="tabpanel"
              aria-labelledby="closed-tab"
            >
              {arrays.closed.length > 0 ? (
                <div className={`row`}>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Title</strong>
                  </div>
                  <div className={`col-3 col-md-5 ${styles.openHeading}`}>
                    <strong>Description</strong>
                  </div>
                  <div className={`col-3 col-md-2 ${styles.openHeading}`}>
                    <strong>Requested By</strong>
                  </div>
                  <div className={`col-3 col-md-3 ${styles.openHeading}`}>
                    <strong>Suggested Article</strong>
                  </div>
                </div>
              ) : (
                <div
                  className={`d-flex flex-column justify-content-center align-items-center`}
                >
                  No requests were closed.
                </div>
              )}
              {renderPendingorClosedRequests(arrays.closed)}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

const Help = (props) => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedComponent
        open={props.open}
        closed={props.closed}
        pending={props.pending}
      />
    </ToastProvider>
  );
};

export default Help;
