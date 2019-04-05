/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { post } from '../../helpers/fetch';
import { showErrorToast, showSuccessToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';
import { login } from '../../actions/user';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
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
        const userInfo = {
          userId: response.id,
          userName: name,
          accessToken: response.access_token,
        };
        showSuccessToast('User created successfully');
        this.props.login(userInfo);
      });
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Username" name="name" onChange={this.handleInputChange} />
        <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleInputChange} />
        <button type="submit" onClick={this.handleSubmit}> Register </button>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));