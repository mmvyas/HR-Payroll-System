import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";

import { Link } from "react-router-dom";

class Payslip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.match.params.name,
      payDate: new Date().toDateString(),
      payPeriod: "",
      payFrequecy: "Monthly",
      annualIncome: this.props.match.params.annualSalary,
      grossIncome: (this.props.match.params.annualSalary / 12).toFixed(0),
      incomeTax: 0,
      netIncome: 0,
      superAnnuation: 0,
      pay: 0
    };
  }

  getIncomeTax() {
    let taxTable = [
      {
        down: 0,
        up: 18200,
        base: 0,
        rate: 0
      },
      {
        down: 18201,
        up: 37000,
        base: 0,
        rate: 0.19
      },
      {
        down: 37001,
        up: 80000,
        base: 3572,
        rate: 0.325
      },
      {
        down: 80001,
        up: 180000,
        base: 17547,
        rate: 0.37
      },
      {
        down: 180001,
        up: Number.MAX_SAFE_INTEGER,
        base: 54547,
        rate: 0.45
      }
    ];

    var tax = 0;
    for (let i = 0; i < taxTable.length; i++) {
      const { down, up, base, rate } = taxTable[i];
      if (this.state.annualIncome >= down && this.state.annualIncome <= up) {
        tax = Math.round(
          (base + (this.state.annualIncome - down + 1) * rate) / 12
        );
        break;
      }
    }
    this.state.incomeTax = tax.toFixed(0);
    return this.state.incomeTax;
  }

  getNetIncome() {
    this.state.netIncome = this.state.grossIncome - this.state.incomeTax;
    return this.state.netIncome;
  }

  getsuperAnnuation() {
    this.state.superAnnuation = (
      (this.state.grossIncome * this.props.match.params.superRate) /
      100
    ).toFixed(0);
    return this.state.superAnnuation;
  }

  getPay() {
    this.state.pay = this.state.netIncome - this.state.superAnnuation;
    return this.state.pay;
  }

  getPayPeriod() {
    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var n = month[d.getMonth()];
    this.state.payPeriod = n;
    console.log(n);
    return n;
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch("/api/storePayslip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        date: this.state.payDate,
        period: this.state.payPeriod,
        frequecy: this.state.payFrequecy,
        annual_income: this.state.annualIncome,
        gross_income: this.state.grossIncome,
        income_tax: this.state.incomeTax,
        net_income: this.state.netIncome,
        super: this.state.superAnnuation,
        pay: this.state.pay
      })
    });

    if (response.status === 200) {
      window.alert(
        "Salary credited successfully to " +
          this.state.name +
          " for " +
          this.state.payPeriod
      );
    }

    if (response.status === 500) {
      window.alert(
        "Salary has already been credited to " +
          this.state.name +
          " for " +
          this.state.payPeriod
      );
    }
  };

  render() {
    let style = {
      fontWeight: "bold"
    };
    return (
      <div style={{ display: "flex" }}>
        <form onSubmit={this.handleSubmit}>
          <Container>
            <Table striped style={{ width: "800px" }}>
              <tbody>
                <h3 style={{ textAlign: "right" }}>
                  Payslip: {this.state.name}
                </h3>

                <tr>
                  <td style={style}>Pay date:</td>
                  <td>{this.state.payDate}</td>
                </tr>
                <tr>
                  <td style={style}>Pay period:</td>
                  <td>{this.getPayPeriod()}</td>
                </tr>
                <tr>
                  <td style={style}>Pay frequency:</td>
                  <td>{this.state.payFrequecy}</td>
                </tr>
                <tr>
                  <td style={style}>Annual Income:</td>
                  <td>$ {this.state.annualIncome}</td>
                </tr>
                <tr>
                  <td style={style}>Gross Income: </td>
                  <td>$ {this.state.grossIncome}</td>
                </tr>
                <tr>
                  <td style={style}>Income tax: </td>
                  <td>{this.getIncomeTax()}</td>
                </tr>
                <tr>
                  <td style={style}>Net Income: </td>
                  <td>{this.getNetIncome()}</td>
                </tr>
                <tr>
                  <td style={style}>Super:</td>
                  <td>{this.getsuperAnnuation()}</td>
                </tr>
                <tr>
                  <td style={style}>Pay: </td>
                  <td>{this.getPay()}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              className="float-right"
              color="primary"
              type="submit"
              value={this.state.post}
              onSubmit={e => this.setState({ post: e.target.value })}
            >
              Pay
            </Button>{" "}
            <Link to="/">
              <Button
                style={{ marginRight: "10px" }}
                className="float-right"
                color="primary"
              >
                Back To Home
              </Button>
            </Link>
          </Container>
        </form>
      </div>
    );
  }
}

export default Payslip;
