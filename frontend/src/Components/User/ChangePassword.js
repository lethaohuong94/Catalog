import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {
  render() {
    return (
      <div>
        <h3>This is where logged in user change password</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ChangePassword;