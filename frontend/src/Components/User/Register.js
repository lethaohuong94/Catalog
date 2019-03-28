import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class Register extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
      .then((json) => {
        if (json.message !== 'user created successfully') {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast(json.message);
        const token = json.access_token;
        const state = {
          userId: json.id,
          userName: name,
          loggedIn: true,
          accessToken: token,
        };
        const { onChangeState } = this.props;
        onChangeState(state);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    return (
      <div>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
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