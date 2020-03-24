import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Search from "./pages/Search";
import history from "./history";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Publish" exact component={Publish} />
          <Route path="/Search" exact component={Search} />
        </Switch>
      </Router>
    );
  }
}
