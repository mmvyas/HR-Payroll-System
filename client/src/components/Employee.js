import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

const NAME_REGEX = /^[a-zA-Z ]{1,30}$/;

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      annualSalary: "",
      super: "",
      toPayslip: false,
      name: ""
    };
  }

  GeneratePayslip() {
    const validationErrors = this.validate();
    if (validationErrors.length > 0) {
      window.alert(validationErrors);
      return;
    }
    this.state.name = this.state.firstName + " " + this.state.lastName;
    this.setState({ toPayslip: true });
  }

  validate() {
    const errors = [];
    this.isNameValid("Firstname", this.state.firstName, errors);
    this.isNameValid("Lastname", this.state.lastName, errors);
    this.isSalaryValid("Annual Salary", this.state.annualSalary, errors);
    this.isSalaryValid("Super Rate", this.state.super, errors);
    return errors;
  }

  isNameValid(name, value, errors) {
    if (!value) {
      errors.push("Required " + [name]);
    } else if (!NAME_REGEX.test(value)) {
      errors.push("Invalid " + [name]);
    }
    return errors;
  }

  isSalaryValid(name, value, errors) {
    if (!value && value !== 0) {
      errors.push("Required " + [name]);
    } else if (value < 0) {
      errors.push("Invalid " + [name]);
    }
    return errors;
  }

  render() {
    if (this.state.toPayslip) {
      return (
        <Redirect
          push
          to={
            `/Payslip/` +
            this.state.name +
            "/" +
            this.state.annualSalary +
            "/" +
            this.state.super
          }
        />
      );
    }

    return (
      <div style={{ display: "flex" }}>
        <Container>
          <Form>
            <Row>
              <InputGroup className="col-md-5">
                <h4>Enter Employee Details</h4>
              </InputGroup>
            </Row>
            <br />
            <Row>
              <Col>
                <Input
                  value={this.state.firstName}
                  maxLength={30}
                  onChange={e =>
                    this.setState({ firstName: e.target.value.trim() })
                  }
                  placeholder="Firstname"
                />
              </Col>
              <Col>
                <Input
                  value={this.state.lastName}
                  maxLength={30}
                  onChange={e =>
                    this.setState({ lastName: e.target.value.trim() })
                  }
                  placeholder="Lastname"
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.annualSalary}
                    placeholder="Annual Salary"
                    min={0}
                    type="number"
                    step="1"
                    onChange={e =>
                      this.setState({ annualSalary: e.target.value })
                    }
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>.00</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.super}
                    placeholder="Super Rate"
                    min={0}
                    max={100}
                    type="number"
                    step="1"
                    onChange={e => this.setState({ super: e.target.value })}
                  />
                </InputGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Button
                  onClick={e => this.GeneratePayslip()}
                  className="float-right"
                  color="primary"
                >
                  Generate Payslip
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Employee;
