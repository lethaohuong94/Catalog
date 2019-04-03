/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast, validateTextInput } from '../../Helpers/helpers';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit() {
    const { name, password, confirmPassword } = this.state;

    try {
      validateTextInput('name', name);
      validateTextInput('password', password);
      if (password !== confirmPassword) throw Error('passwords do not match');
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post('/users', { name, password })
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('User created successfully');
        const userInfo = {
          userId: response.id,
          userName: name,
          accessToken: response.access_token,
        };
        this.props.login(userInfo);
      });
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Username" onChange={e => this.handleChangeName(e)} />
        <input type="password" placeholder="Password" onChange={e => this.handleChangePassword(e)} />
        <input type="password" placeholder="Confirm Password" onChange={e => this.handleChangeConfirmPassword(e)} />
        <button type="submit" onClick={e => this.handleSubmit(e)}> Register </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}

export default Register;