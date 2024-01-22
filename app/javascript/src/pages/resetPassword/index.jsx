import React from "react";
import ReactDOM from "react-dom";
import ResetPassword from "./resetPassword";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ResetPassword/>,
    document.body.appendChild(document.createElement("div")),
  );
});