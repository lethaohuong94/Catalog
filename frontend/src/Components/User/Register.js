import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <div>
        <h3>This is where new user registers</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Register;