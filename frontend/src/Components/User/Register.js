import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.message = 'Please fill the form';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;
    if (password !== confirmPassword) {
      this.message = 'passwords do not match';
      console.log(this.message);
      // eslint-disable-next-line no-param-reassign
      event.target.elements.password.value = '';
      // eslint-disable-next-line no-param-reassign
      event.target.elements.confirmPassword.value = '';
      this.forceUpdate();
      return;
    }
    const targetUrl = 'http://127.0.0.1:5000/users';
    fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      .then(response => ({ data: response.json(), status: response.status }))
      .then((response) => {
        //take care of status code here
        console.log(response.status);
        return response.data;
      })
      .then((data) => {
        //take care of response's message here
        console.log(data.message);
        this.message = data.message;
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
        <h3>This is where new user registers</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>{this.message}</h5>
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