import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';
import { post, put } from '../../Helpers/fetchHelpers';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, history } = this.props;
    const { userId, userName, accessToken } = user;
    //event.target.elements
    const oldPassword = event.target.elements.oldPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
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
            if (response.successful) {
              showSuccessToast('User updated successfully');
              history.push('/');
            }
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