import React, { Component } from 'react';
import { post } from '../../fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../helpers';

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

    const request = post('/users', { name, password });

    //Make an api call to register user
    fetch(request.url, request.request)
      .then(response => response.json())
      .then((json) => {
        //If not success then throw error
        if (json.message !== 'user created successfully') {
          throw Error(json.message);
        }
        //If success
        showSuccessToast(json.message);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    return (
      <div>
        <h3>This is where new user registers</h3>
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