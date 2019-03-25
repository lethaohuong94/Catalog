import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Catalog App</Link>
        </h1>
        <div className="button-container">
          <Link className="button" to="/register">Register</Link>
          <Link className="button" to="/changepassword">Change Password</Link>
          <Link className="button" to="/login">Log in</Link>
          <button type="button" className="button" to="/login">Log out</button>
        </div>
      </div>
    );
  }
}

export default Header;