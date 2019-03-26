import React, { Component } from 'react';
import toastr from 'toastr';
import config from '../../config';

class ChangePassword extends Component {
  constructor() {
    super();
    this.message = 'Please fill the form';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const props = this.props;
    const name = event.target.elements.name.value;
    const oldPassword = event.target.elements.oldPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      this.message = 'passwords do not match';
      toastr.clear();
      setTimeout(() => toastr.error(`${this.message}`), 300);
      return;
    }

    //Initialize requests
    //const postUrl = 'http://127.0.0.1:5000/auth';
    const postUrl = `${config.URL}/auth`;
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password: oldPassword }),
    };
    const requestHeaders = new Headers({ 'Content-Type': 'application/json' });
    requestHeaders.append('Authorization', `Bearer ${props.accessToken}`);
    const putRequest = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify({ name, password: newPassword }),
    };

    fetch(postUrl, postRequest)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        //If old password is invalid then show error toast
        if (!('access_token' in json)) {
          toastr.clear();
          setTimeout(() => toastr.error(`${json.message}`), 300);
          return;
        }
        //If success then make api call to change password
        const putUrl = `http://127.0.0.1:5000/users/${json.id}`;
        fetch(putUrl, putRequest)
          .then(response => response.json())
          .then((json) => {
            console.log(json);
            //If password is not updated then throw error
            if (json.message !== 'User updated successfully') {
              throw Error(json.message);
            }
            //If success then show success toast
            toastr.clear();
            setTimeout(() => toastr.success(json.message), 300);
          })
          //Catch error and show error toast
          .catch((error) => {
            console.log(error.message);
            toastr.clear();
            setTimeout(() => toastr.error(`${error.message}`), 300);
          });
      });
  }

  render() {
    return (
      <div>
        <h3>This is where user changes password</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>{this.message}</h5>
            <input type="text" placeholder="Username" name="name" />
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