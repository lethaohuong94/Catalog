import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class Register extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      showErrorToast('passwords do not match');
      return;
    }

    post('/users', { name, password })
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('User created successfully');
        const state = {
          user: {
            userId: response.id,
            userName: name,
            loggedIn: true,
            accessToken: response.access_token,
          } };
        const { onChangeState } = this.props;
        onChangeState(state);
      });
  }

  render() {
    return (
      <div>
        <div className="form">
          <form onSubmit={e => this.handleSubmit(e)}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="Username" name="name" />
            <input type="password" placeholder="Password" name="password" />
            <input type="password" placeholder="Confirm Password" name="confirmPassword" />
            <button type="submit"> Register </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;