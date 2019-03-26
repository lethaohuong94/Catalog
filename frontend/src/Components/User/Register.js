import React, { Component } from 'react';
import toastr from 'toastr';
import config from '../../config';

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
      toastr.clear();
      setTimeout(() => toastr.error('passwords do not match'), 300);
      return;
    }

    //Initialize api call to register user
    //const url = 'http://127.0.0.1:5000/users';
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
        //If success then show a success toast
        toastr.clear();
        setTimeout(() => toastr.success(json.message), 300);
      })
      //Catch error in response and show an error toast
      .catch((error) => {
        console.log(error.message);
        toastr.clear();
        setTimeout(() => toastr.error(`${error.message}`), 300);
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