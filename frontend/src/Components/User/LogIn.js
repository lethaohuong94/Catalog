/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { showSuccessToast, showErrorToast, validateTextInput } from '../../Helpers/helpers';
import { post } from '../../Helpers/fetchHelpers';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', password: '' };
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

  handleSubmit() {
    const { name, password } = this.state;

    try {
      validateTextInput('name', name);
      validateTextInput('password', password);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post('/auth', { name, password })
      .then((response) => {
        if (!response.successful) return;
        const userInfo = {
          userId: response.id,
          userName: name,
          accessToken: response.access_token,
        };
        showSuccessToast('Log in successfully');
        this.props.login(userInfo);
      });
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Username" onChange={e => this.handleChangeName(e)} />
        <input type="password" placeholder="Password" onChange={e => this.handleChangePassword(e)} />
        <button type="submit" onClick={e => this.handleSubmit(e)}> Log In </button>
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

export default LogIn;