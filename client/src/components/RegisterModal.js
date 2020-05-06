import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  NavItem,
} from "reactstrap";
import { connect } from "react-redux";
import { register } from "../actions/authActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = { name, email, password };
    this.props.register(newUser);
  };

  render() {
    console.log(this.props.isAuthenticated);
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
              />
              <Label for="email">Email</Label>
              <Input
                type="Email"
                name="email"
                id="email"
                placeholder="email"
                onChange={this.onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={this.onChange}
              />
              <Button
                color="dark"
                style={{ margin: "2rem" }}
                onClick={this.onSubmit}
              >
                Register
              </Button>
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapPropstoSate = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  err: state.error,
});

export default connect(mapPropstoSate, { register })(RegisterModal);
