import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor() {
    super();
    this.message = 'Please fill the form';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const oldPassword = event.target.elements.oldPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      this.message = 'passwords do not match';
      console.log(this.message);
      // eslint-disable-next-line no-param-reassign
      event.target.elements.newPassword.value = '';
      // eslint-disable-next-line no-param-reassign
      event.target.elements.confirmPassword.value = '';
      this.forceUpdate();
      return;
    }
    const targetUrl = 'http://127.0.0.1:5000/auth';
    fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password: oldPassword }),
    })
      .then(response => response.json())
      .then((json) => {
        this.message = json.message;
        console.log(this.message);
        this.forceUpdate();
      })
      .catch((error) => {
        console.log(error);
        return error;
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