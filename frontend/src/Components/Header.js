/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/user';

class Header extends Component {
  handleLogout = () => {
    const { history } = this.props;
    this.props.logout();
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
    const { userId } = this.props;
    return (
      <div className="button-container">
        <Link className="button" to="/changepassword">Change Password</Link>
        <button type="button" className="button" onClick={this.handleLogout}>
          Log out
        </button>
        <h5>{`user id: ${userId}`}</h5>
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
    const { loggedIn } = this.props;
    return (
      <div className="header">
        {this.renderTitle()}
        {loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  userId: state.user.userId,
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
