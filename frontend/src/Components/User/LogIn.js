import React, { Component } from 'react';
import toastr from 'toastr';
import config from '../../config';

class LogIn extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;

    //Initialize api request to authenticate user
    //const url = 'http://127.0.0.1:5000/auth';
    const url = `${config.URL}/auth`;
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    };

    //Make api call to authenticate user
    fetch(url, request)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        //If not success then throw error
        if (!('access_token' in json)) {
          throw Error(json.message);
        }
        //If success then change state
        const token = json.access_token;
        const state = {
          loggedIn: true,
          accessToken: token,
          id: json.id,
        };
        const props = this.props;
        props.onChangeState(state);
        toastr.clear();
        setTimeout(() => toastr.success('Log in successfully'), 300);
      })
      //Catch error and show an error toast
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
        <h3>This is where user log in</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="Username" name="name" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit"> Log In </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;