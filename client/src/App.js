import React, { Component } from "react";
import "./App.css";
import Employee from "./components/Employee";
import Payslip from "./components/Payslip";

import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Redirect exact from="/" to="/employee" />
            <Route path="/employee" component={Employee} />
            <Route
              path="/payslip/:name/:annualSalary/:superRate"
              exact={true}
              component={Payslip}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
