/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { showSuccessToast } from '../../Helpers/toasterHelpers';
import { post } from '../../Helpers/fetchHelpers';

class LogIn extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;

    post('/auth', { name, password })
      .then((response) => {
        if (!response.successful) return;
        const newState = {
          user: {
            userId: response.id,
            userName: name,
            loggedIn: true,
            accessToken: response.access_token,
          } };
        this.props.onChangeState(newState);
        showSuccessToast('Log in successfully');
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
            <button type="submit"> Log In </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;