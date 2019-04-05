/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { showErrorToast, showSuccessToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';
import { post, put } from '../../helpers/fetch';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { oldPassword: '', newPassword: '', confirmPassword: '' };
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
    const { user, history } = this.props;
    const { userId, userName, accessToken } = user;
    const { oldPassword, newPassword, confirmPassword } = this.state;

    try {
      validateTextInput('old password', oldPassword);
      validateTextInput('new password', confirmPassword);
      if (newPassword !== confirmPassword) throw Error('passwords do not match');
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post('/auth', { name: userName, password: oldPassword })
      .then((response) => {
        //validate old password
        if (!response.successful) return;
        put(`/users/${userId}`, { name: userName, password: newPassword }, accessToken)
          .then((response) => {
            if (!response.successful) return;
            showSuccessToast('User updated successfully');
            history.push('/');
          });
      });
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="password" placeholder="Old Password" name="oldPassword" onChange={this.handleInputChange} />
        <input type="password" placeholder="New Password" name="newPassword" onChange={this.handleInputChange} />
        <input type="password" placeholder="Confirm New Password" name="confirmPassword" onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}> Change Password </button>
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

export default withRouter(connect(mapStateToProps)(ChangePassword));