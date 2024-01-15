import React from "react";
import ReactDOM from "react";
import LandingPage from "./landingPage";

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LandingPage />,
    document.body.appendChild(document.createElement('div')),
  );
});