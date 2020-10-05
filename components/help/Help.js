import React from "react";

const Help = () => {
  const renderAboutThisPageArea = () => (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#aboutusModal"
      >
        Why this page?
      </button>

      <div
        class="modal fade"
        id="aboutusModal"
        tabindex="-1"
        aria-labelledby="aboutusModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="aboutusModalLabel">
                About
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
            <div class="modal-body">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
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
  return <div className={`container`}>{renderAboutThisPageArea()}</div>;
};

export default Help;
