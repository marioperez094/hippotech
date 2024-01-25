import React from "react";

function ErrorText(props) {
  const { error } = props;
  return (
    <>
      <p className="text-center text-danger">{ error }</p>
    </>
  )
};

export default ErrorText;