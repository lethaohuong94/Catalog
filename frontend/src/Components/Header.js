import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>Catalog App</h1>
        <div className="button-container">
          <Link className="button" to="/register">Register</Link>
          <Link className="button" to="/changepassword">Change Password</Link>
          <Link className="button" to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default Header;