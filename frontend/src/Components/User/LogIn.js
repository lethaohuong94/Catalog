import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogIn extends Component {
  render() {
    return (
      <div>
        <h3>This is where logged in user log in</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default LogIn;