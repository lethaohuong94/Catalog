import React, { Component } from 'react';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';
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
      .then((json) => {
        if (!('access_token' in json)) {
          showErrorToast(json.message);
          return;
        }
        const token = json.access_token;
        const newState = {
          user: {
            userId: json.id,
            userName: name,
            loggedIn: true,
            accessToken: token,
          } };
        // eslint-disable-next-line react/destructuring-assignment
        this.props.onChangeState(newState);
        showSuccessToast('Log in successfully');
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
            <button type="submit"> Log In </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;