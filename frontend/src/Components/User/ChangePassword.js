import React, { Component } from 'react';
import { ShowErrorToast, ShowSuccessToast } from '../../Helpers';
import config from '../../config';

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
      ShowErrorToast('Passwords do not match');
      return;
    }

    //Initialize requests
    const postUrl = `${config.URL}/auth`;
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, password: oldPassword }),
    };
    const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    requestHeaders.append('Authorization', `Bearer ${accessToken}`);
    const putRequest = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify({ name: userName, password: newPassword }),
    };

    fetch(postUrl, postRequest)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        //If old password is invalid then show error toast
        if (!('access_token' in json)) {
          ShowErrorToast(json.message);
          return;
        }
        //If success then make api call to change password
        const putUrl = `${config.URL}/users/${userId}`;
        fetch(putUrl, putRequest)
          .then(response => response.json())
          .then((json) => {
            console.log(json);
            //If password is not updated then throw error
            if (json.message !== 'User updated successfully') {
              ShowErrorToast(json.message);
            }
            //If success
            ShowSuccessToast(json.message);
          })
          .catch((error) => {
            ShowErrorToast(error.message);
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