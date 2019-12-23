import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";

import PrivateLayout from "./layouts/Private";
import PublicLayout from "./layouts/Public";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/private" render={props => <PrivateLayout {...props} />} />
      <Route path="/public" render={props => <PublicLayout {...props} />} />
      <Redirect from="/" to="/private/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

