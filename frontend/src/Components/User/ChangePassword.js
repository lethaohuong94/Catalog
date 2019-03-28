import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';
import { post, put } from '../../Helpers/fetchHelpers';

class ChangePassword extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userId, userName, accessToken } = this.props;
    const oldPassword = event.target.elements.oldPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }

    post('/auth', { name: userName, password: oldPassword })
      .then((json) => {
        //if old password is invalid then return
        if (!('access_token' in json)) {
          showErrorToast(json.message);
          return;
        }
        //if old password is valid then change password
        put(`/users/${userId}`, { name: userName, password: newPassword }, accessToken)
          .then((json) => {
            if (json.message !== 'User updated successfully') {
              showErrorToast(json.message);
            }
            showSuccessToast(json.message);
            // eslint-disable-next-line react/destructuring-assignment
            this.props.history.push('/');
          })
          .catch((error) => {
            showErrorToast(error.message);
          });
      });
  }

  render() {
    return (
      <div>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="password" placeholder="Old Password" name="oldPassword" />
            <input type="password" placeholder="New Password" name="newPassword" />
            <input type="password" placeholder="Confirm New Password" name="confirmPassword" />
            <button type="submit"> Change Password </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);