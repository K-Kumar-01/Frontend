import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";
import styles from "./Help.module.css";

const Help = () => {
  const [tokenDetails, setTokenDetails] = useState(false);
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();
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

  const renderCreateRequestModal = () => (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#createRequest"
      >
        Create Request
      </button>

      <div
        class="modal fade"
        id="createRequest"
        tabindex="-1"
        aria-labelledby="createRequestLabel"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center" id="createRequestLabel">
                Create Request
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={resetFormState}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="modal-body">{renderRequestForm()}</div>
              <div class="modal-footer">
                <button
                  type="submit"
                  className={`btn btn-lg btn-success text-uppercase font-weight-bold mb-2 ${styles.btnLogin}`}
                  disabled={
                    Object.keys(formState.touched).length < 2 ||
                    Object.keys(errors).length !== 0
                  }
                  data-dismiss="modal"
                  onClick={resetFormState}
                >
                  Create
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
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

  return (
    <div className={`container`}>
      <div className={`d-flex justify-content-between`}>
        {renderAboutThisPageArea()}
        {tokenDetails && renderCreateRequestModal()}
      </div>
    </div>
  );
};

export default Help;
