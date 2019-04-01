import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    const { user, onChangeState, history } = this.props;
    const newState = {
      user: {
        loggedIn: false,
        userId: 0,
        userName: '',
        accessToken: '',
      } };

    if (user.loggedIn) {
      return (
        <div className="header">
          <h1>
            <Link to="/">Catalog App</Link>
          </h1>
          <div className="button-container">
            <Link className="button" to="/changepassword">Change Password</Link>
            <button type="button" className="button" onClick={() => { onChangeState(newState); history.push('/'); }}>
              Log out
            </button>
            <h5>{`user id: ${user.userId}`}</h5>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1>
          <Link to="/">Catalog App</Link>
        </h1>
        <div className="button-container">
          <Link className="button" to="/register">Register</Link>
          <Link className="button" to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
