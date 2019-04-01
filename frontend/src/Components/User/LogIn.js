/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { showSuccessToast } from '../../Helpers/toasterHelpers';
import { post } from '../../Helpers/fetchHelpers';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const password = event.target.elements.password.value;

    post('/auth', { name, password })
      .then((response) => {
        // if (!('access_token' in json)) {
        //   showErrorToast(json.message);
        //   return;
        // }
        if (response.successful) {
          const token = response.access_token;
          const newState = {
            user: {
              userId: response.id,
              userName: name,
              loggedIn: true,
              accessToken: token,
            } };
          this.props.onChangeState(newState);
          showSuccessToast('Log in successfully');
        }
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
            <button type="submit"> Log In </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;