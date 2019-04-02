import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  handleLogout() {
    const { onChangeState, history } = this.props;
    const newState = {
      user: {
        loggedIn: false,
        userId: 0,
        userName: '',
        accessToken: '',
      } };
    onChangeState(newState);
    history.push('/');
  }

  renderTitle() {
    return (
      <h1>
        <Link to="/">Catalog App</Link>
      </h1>
    );
  }

  renderLoggedIn() {
    const { user } = this.props;
    return (
      <div className="button-container">
        <Link className="button" to="/changepassword">Change Password</Link>
        <button type="button" className="button" onClick={e => this.handleLogout(e)}>
              Log out
        </button>
        <h5>{`user id: ${user.userId}`}</h5>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="button-container">
        <Link className="button" to="/register">Register</Link>
        <Link className="button" to="/login">Log in</Link>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if (user.loggedIn) {
      return (
        <div className="header">
          {this.renderTitle()}
          {this.renderLoggedIn()}
        </div>
      );
    }

    return (
      <div className="header">
        {this.renderTitle()}
        {this.renderNotLoggedIn()}
      </div>
    );
  }
}

export default withRouter(Header);
