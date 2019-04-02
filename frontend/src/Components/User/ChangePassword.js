import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';
import { post, put } from '../../Helpers/fetchHelpers';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { oldPassword: '', newPassword: '', confirmPassword: '' };
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleChangeOldPassword(event) {
    this.setState({ oldPassword: event.target.value });
  }

  handleChangeNewPassword(event) {
    this.setState({ newPassword: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit() {
    const { user, history } = this.props;
    const { userId, userName, accessToken } = user;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      showErrorToast('Passwords do not match');
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
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="password" placeholder="Old Password" onChange={e => this.handleChangeOldPassword(e)} />
        <input type="password" placeholder="New Password" onChange={e => this.handleChangeNewPassword(e)} />
        <input type="password" placeholder="Confirm New Password" onChange={e => this.handleChangeConfirmPassword(e)} />
        <button type="submit" onClick={e => this.handleSubmit(e)}> Change Password </button>
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

export default withRouter(ChangePassword);