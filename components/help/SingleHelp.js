import React from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";

const ToastedComponentSingleHelp = (props) => {
  const { addToast } = useToasts();
  return <div>hello</div>;
};

const SingleHelp = (props) => {
  return (
    <ToastProvider>
      <ToastedComponentSingleHelp request={props.request} />
    </ToastProvider>
  );
};

export default SingleHelp;
