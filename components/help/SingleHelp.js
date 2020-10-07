import React, { useState, useEffect } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
  const { register, errors, handleSubmit, formState, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: request.title,
      description: request.desc,
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

  const onSubmit = async (data, event) => {
    event.preventDefault();
    $("#editRequest").modal("hide");
    let response;
    // setLoading(true);
    // try {
    //   response = await createRequest({
    //     title: data.title.trim(),
    //     desc: data.description.trim(),
    //   });
    //   setLoading(false);
    //   if (response.error) {
    //     addToast(`${response.error}`, {
    //       appearance: "error",
    //       autoDismiss: true,
    //     });
    //   } else {
    //     addToast(`${response.message}`, {
    //       appearance: "success",
    //       autoDismiss: true,
    //     });
    //     router.reload();
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   addToast(`${error.message}`, {
    //     appearance: "error",
    //     autoDismiss: true,
    //   });
    // }
    resetFormState();
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
                  disabled={Object.keys(errors).length !== 0}
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

  return (
    <section style={{ minHeight: "70vh" }}>
      <div className={`container`}>
        {renderEditRequestModal()}
        <div className={`d-flex justify-content-between`}>
          <h2 className={`heading text-capitalize`}>Request Details</h2>
          {tokenDetails.username === request.postedBy.username &&
            new Date().getTime() - new Date(request.createdAt).getTime() <
              1.728e8 && (
              <IconContext.Provider value={{ size: "2rem", color: "#17A2B8" }}>
                <div
                  title="Edit"
                  style={{ cursor: "pointer" }}
                  data-toggle="modal"
                  data-target="#editRequest"
                >
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
