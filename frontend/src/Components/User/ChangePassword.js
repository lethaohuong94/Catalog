import React, { Component } from 'react';
import { showErrorToast, showSuccessToast } from '../../helpers';
import { post, put } from '../../fetchHelpers';

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

    //Initialize requests
    const postRequest = post('/auth', { name: userName, password: oldPassword });
    const putRequest = put(`/users/${userId}`, { name: userName, password: newPassword }, accessToken);


    fetch(postRequest.url, postRequest.request)
      .then(response => response.json())
      .then((json) => {
        //If old password is invalid then show error toast
        if (!('access_token' in json)) {
          showErrorToast(json.message);
          return;
        }
        //If success then make api call to change password
        fetch(putRequest.url, putRequest.request)
          .then(response => response.json())
          .then((json) => {
            //If password is not updated then throw error
            if (json.message !== 'User updated successfully') {
              showErrorToast(json.message);
            }
            //If success
            showSuccessToast(json.message);
          })
          .catch((error) => {
            showErrorToast(error.message);
          });
      });
  }

  render() {
    return (
      <div>
        <h3>This is where user changes password</h3>
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

export default ChangePassword;