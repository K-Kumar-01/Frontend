import React, { useEffect, useState } from "react";
import { authenticate } from "../../helpers/auth";
import { COOKIE_NAME } from "../../appConstants";

const Help = () => {
  const [tokenDetails, setTokenDetails] = useState(false);

  useEffect(() => {
    let tokenData = authenticate(COOKIE_NAME);
    setTokenDetails(tokenData);
  },[]);

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
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
