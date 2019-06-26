import React from "react";
import { render } from "react-dom";

import "./index.scss";

import { BrowserRouter as Router } from "react-router-dom";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";

render(
  <Router>
    <UserProvider>
      <Application />
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
