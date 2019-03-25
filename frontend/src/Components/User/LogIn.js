import React, { Component } from 'react';

class LogIn extends Component {
  constructor() {
    super();
    this.message = 'Please fill the form';
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;
    fetch('http://127.0.0.1:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        this.message = json.message;
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
        <h3>This is where user log in</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>{this.message}</h5>
            <input type="text" placeholder="Username" name="name" />
            <input type="text" placeholder="Password" name="password" />
            <button type="submit"> Log In </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;