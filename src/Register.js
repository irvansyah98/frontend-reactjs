import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Register extends Component{
    userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        birthdate: "",
        country: "",
        city: "",
        isLoading: "",
      },
      msg: "",
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/register", this.state.signupData)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            msg: response.data.message,
            signupData: {
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              password: "",
              birthdate: "",
              country: "",
              city: "",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
        }
      });
  };
    render(){
        const isLoading = this.state.isLoading;
        return(
          <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            Register
                        </div>
                        <div className="card-body">
                          <Form className="container">
                            <FormGroup>
                              <Label for="name">First Name</Label>
                              <Input
                                type="name"
                                name="firstname"
                                placeholder="Enter first name"
                                value={this.state.signupData.firstname}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="name">Last Name</Label>
                              <Input
                                type="name"
                                name="lastname"
                                placeholder="Enter last name"
                                value={this.state.signupData.lastname}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="email">Email</Label>
                              <Input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.signupData.email}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="phone">Phone Number</Label>
                              <Input
                                type="phone"
                                name="phone"
                                placeholder="Enter phone number"
                                value={this.state.signupData.phone}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="password">Password</Label>
                              <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.signupData.password}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="name">Birth Date</Label>
                              <Input
                                type="date"
                                name="birthdate"
                                placeholder="Enter last name"
                                value={this.state.signupData.birthdate}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="name">Country</Label>
                              <Input
                                type="country"
                                name="country"
                                placeholder="Enter last name"
                                value={this.state.signupData.country}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="city">City</Label>
                              <Input
                                type="city"
                                name="city"
                                placeholder="Enter last name"
                                value={this.state.signupData.city}
                                onChange={this.onChangehandler}
                              />
                            </FormGroup>
                            <p className="">{this.state.msg}</p>
                            <Button
                              className="text-center mb-4"
                              color="success"
                              onClick={this.onSubmitHandler}
                            >
                              Sign Up
                              {isLoading ? (
                                <span
                                  className="spinner-border spinner-border-sm ml-5"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              ) : (
                                <span></span>
                              )}
                            </Button>
                            {/* <Link to="/" className="ml-5">I'm already member</Link> */}
                          </Form>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}
export default Register;