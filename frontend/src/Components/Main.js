/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Panel from './Panel';
import Register from './User/Register';
import LogIn from './User/LogIn';
import ChangePassword from './User/ChangePassword';
import { login, logout } from '../Actions/userAction';

class Main extends Component {
  renderLoggedIn() {
    const { user } = this.props;
    return (
      <div>
        <Header user={user} logout={this.props.logout} />
        <Switch>
          <Route path="/register" exact render={() => <Redirect to="/" />} />
          <Route path="/login" exact render={() => <Redirect to="/" />} />
          <Route path="/changepassword" exact render={() => <ChangePassword user={user} />} />
          <Route render={() => <Panel user={user} />} />
        </Switch>
      </div>
    );
  }

  renderNotLoggedIn() {
    const { user } = this.props;
    return (
      <div>
        <Header user={user} onChangeState={this.changeState} />
        <Switch>
          <Route path="/register" exact render={() => <Register login={this.props.login} />} />
          <Route path="/login" exact render={() => <LogIn login={this.props.login} />} />
          <Route path="/changepassword" exact render={() => <Redirect to="/login" />} />
          <Route render={() => <Panel user={user} />} />
        </Switch>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    if (user.loggedIn) {
      return (
        <div>
          {this.renderLoggedIn()}
        </div>
      );
    }

    return (
      <div>
        {this.renderNotLoggedIn()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  login,
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));