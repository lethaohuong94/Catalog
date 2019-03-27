import React, { Component } from 'react';
import config from '../../config';
import { ShowErrorToast, ShowSuccessToast } from '../../Helpers';

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
      ShowErrorToast('passwords do not match');
      return;
    }

    //Initialize api call to register user
    const url = `${config.URL}/users`;
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    };

    //Make an api call to register user
    fetch(url, request)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        //If not success then throw error
        if (json.message !== 'user created successfully') {
          throw Error(json.message);
        }
        //If success
        ShowSuccessToast(json.message);
      })
      .catch((error) => {
        ShowErrorToast(error.message);
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