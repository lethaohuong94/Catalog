import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    const props = this.props;
    const newState = {
      loggedIn: false,
      userId: 0,
      accessToken: '',
    };

    if (props.loggedIn) {
      return (
        <div className="header">
          <h1>
            <Link to="/">Catalog App</Link>
          </h1>
          <div className="button-container">
            <Link className="button" to="/changepassword">Change Password</Link>
            <button type="button" className="button" onClick={() => { props.onChangeState(newState); props.history.push('/'); }}>
              Log out
            </button>
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
