import React, { useState, useEffect } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/router";

import styles from "./SingleHelp.module.css";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";
import {
  editSingleRequest,
  deleteSingleRequest,
  suggestArticleforRequest,
  approveArticleRequest,
} from "../../actions/help";
import LoadingSpinner from "../spinner/LoadingSpinner";

const ToastedComponentSingleHelp = (props) => {
  const { addToast } = useToasts();
  const { request } = props;

  const [tokenDetails, setTokenDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
  }, []);
  const { register, errors, handleSubmit, formState, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: request.title,
      description: request.desc,
    },
  });

  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2,
    formState: formState2,
    reset: reset2,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      sugTitle: "",
    },
  });

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

  const renderAccordingToStatus = (data) => {
    switch (data) {
      case "OPEN":
        return renderOpenStatus();
      case "CLOSED":
        return renderClosedStatus();
      case "PENDING":
        return renderPendingStatus();
      default:
        return "text-info";
    }
  };

  const renderOpenStatus = () => (
    <div className={`row`}>
      <div className={`col-8 mx-auto`}>
        <button
          className={`btn btn-primary`}
          title="Suggest"
          data-toggle="modal"
          data-target="#suggest"
        >
          Suggest
        </button>
      </div>
    </div>
  );
  const renderClosedStatus = () => (
    <React.Fragment>
      <div className={`row`}>
        <div className={`col-3`}>
          <p>
            <strong className={``}>Approved Article</strong>
          </p>
        </div>
        <div className={`col-9 ${styles.changedFont}`}>
          <p>
            <Link href={`/articles/${request.article.slug}`}>
              <a className={`${styles.link}`}>{request.article.title}</a>
            </Link>
          </p>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-3`}>
          <p>
            <strong className={``}>Suggested By</strong>
          </p>
        </div>
        <div className={`col-9 ${styles.changedFont} `}>
          <p>
            <Link href={`/user/profile/${request.closedBy.username}`}>
              <a className={`${styles.link}`}>{request.closedBy.name}</a>
            </Link>
          </p>
        </div>
      </div>

      <div className={`row`}>
        <div className={`col-3`}>
          <p>
            <strong className={``}>Closed on</strong>
          </p>
        </div>
        <div className={`col-9 ${styles.changedFont} `}>
          <p>
            <p>{new Date(request.updatedAt).toDateString()}</p>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
  const renderPendingStatus = () => (
    <React.Fragment>
      <div className={`row`}>
        <div className={`col-3`}>
          <p>
            <strong className={``}>Suggested Article</strong>
          </p>
        </div>
        <div className={`col-9 ${styles.changedFont}`}>
          <p>
            <Link href={`/articles/${request.article.slug}`}>
              <a className={`${styles.link}`}>{request.article.title}</a>
            </Link>
          </p>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-3`}>
          <p>
            <strong className={``}>Suggested By</strong>
          </p>
        </div>
        <div className={`col-9 ${styles.changedFont} `}>
          <p>
            <Link href={`/user/profile/${request.closedBy.username}`}>
              <a className={`${styles.link}`}>{request.closedBy.name}</a>
            </Link>
          </p>
        </div>
      </div>
      <div className={`row`}>
        <div className={`col-8 mx-auto`}>
          <button
            className={`btn btn-primary`}
            title="Approval"
            data-toggle="modal"
            data-target="#approveRequest"
          >
            Approve/Reject
          </button>
        </div>
      </div>
    </React.Fragment>
  );
  const onSubmit = async (data, event) => {
    event.preventDefault();
    $("#editRequest").modal("hide");
    let response;
    setLoading(true);
    try {
      console.log("Hello");
      response = await editSingleRequest(request.slug, {
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
        router.replace("/help");
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

  const suggestArticle = async (data) => {
    event.preventDefault();
    let response;
    $("#suggest").modal("hide");
    setLoading(true);
    try {
      response = await suggestArticleforRequest(request.slug, {
        article: data.sugTitle.trim(),
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

  const deleteRequest = async () => {
    let response;
    const slug = router.query.slug;
    setLoading(true);
    try {
      response = await deleteSingleRequest(slug);
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
        router.replace("/help");
      }
    } catch (error) {
      addToast(`${response.message}`, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  const approveRequest = async (data) => {
    let response;
    const slug = router.query.slug;
    setLoading(true);
    try {
      response = await approveArticleRequest(slug, {
        approve: data,
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
        router.replace(`/help/${slug}`);
      }
    } catch (error) {
      addToast(`${response.message}`, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  const resetFormState = () => {
    reset(
      {
        title: request.title,
        description: request.desc,
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
    reset2(
      {
        sugTitle: "",
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

  const renderRequestForm = () => (
    <>
      <div className={`${styles.formLabelGroup}`}>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Name"
          name="title"
          ref={register({ required: true, pattern: /^[a-zA-Z0-9_]*$/ })}
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

  const renderEditRequestModal = () => (
    <div>
      <div
        className="modal fade"
        id="editRequest"
        tabIndex="-1"
        aria-labelledby="editRequestLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center" id="editRequestLabel">
                Edit Request
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
                    Object.keys(errors).length !== 0 ||
                    Object.keys(formState.touched).length < 1
                  }
                >
                  Edit
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

  const renderDeleteRequestModal = () => (
    <div>
      <div
        className="modal fade"
        id="deleteRequest"
        tabIndex="-1"
        aria-labelledby="deleteRequestLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center" id="deleteRequestLabel">
                Delete Request
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
              Are you sure you want to delete the request?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={deleteRequest}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuggestionModal = () => {
    return (
      <div>
        <div
          className="modal fade"
          id="suggest"
          tabIndex="-1"
          aria-labelledby="suggestLabel"
          aria-hidden="true"
          data-backdrop="static"
          data-keyboard="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-center" id="suggestLabel">
                  Suggest Article
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
              <form onSubmit={handleSubmit2(suggestArticle)}>
                <div className="modal-body">
                  <p>Type the title of the article you want to suggest </p>
                  <div className={`${styles.formLabelGroup}`}>
                    <input
                      type="text"
                      className="form-control"
                      id="sugTitle"
                      placeholder="Name"
                      name="sugTitle"
                      ref={register2({
                        required: true,
                      })}
                      autoComplete="off"
                      style={errors2.sugTitle && { border: "1px solid red" }}
                    />
                    <label htmlFor="sugTitle">Title</label>
                    <p className={`text-danger ${styles.errors}`}>
                      {errors2.sugTitle?.type === "required" &&
                        "Title is required"}
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className={`btn btn-lg btn-success text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
                    disabled={
                      Object.keys(errors2).length !== 0 ||
                      Object.keys(formState2.touched).length === 0
                    }
                  >
                    Suggest
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
  };

  const renderApprovalMoal = () => (
    <div>
      <div
        className="modal fade"
        id="approveRequest"
        tabIndex="-1"
        aria-labelledby="approveRequestLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center" id="approveRequestLabel">
                Approve Suggestion
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
              <p>Do you approve the suggested article ?</p>
              <p>
                Confirming will close the request with the article suggested.
                <br />
                If you do not like it, click Reject and then the request will be
                open again
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => approveRequest("YES")}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => approveRequest("NO")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{ minHeight: "70vh" }}>
      {loading && <LoadingSpinner asOverlay />}
      <div className={`container`}>
        {renderEditRequestModal()}
        {renderDeleteRequestModal()}
        {renderSuggestionModal()}
        {renderApprovalMoal()}
        <div className={`d-flex justify-content-between align-items-center`}>
          <h2 className={`heading text-capitalize`}>Request Details</h2>
          <div>
            {tokenDetails.username === request.postedBy.username &&
              request.status === "OPEN" &&
              new Date().getTime() - new Date(request.createdAt).getTime() <
                1.728e8 && (
                <IconContext.Provider
                  value={{ size: "2rem", color: "#17A2B8" }}
                >
                  <span
                    className={`mr-2`}
                    title="Edit"
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#editRequest"
                  >
                    <FaEdit />
                  </span>
                </IconContext.Provider>
              )}
            {tokenDetails.username === request.postedBy.username &&
              request.status === "OPEN" && (
                <IconContext.Provider
                  value={{ size: "2rem", color: "#C23F3F" }}
                >
                  <span
                    title="Delete"
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    data-target="#deleteRequest"
                  >
                    <FaTrashAlt />
                  </span>
                </IconContext.Provider>
              )}
          </div>
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

        {renderAccordingToStatus(request.status)}
      </div>
    </section>
  );
};

const SingleHelp = (props) => {
  return (
    <ToastProvider placement="bottom-right">
      <ToastedComponentSingleHelp request={props.request} />
    </ToastProvider>
  );
};

export default SingleHelp;
