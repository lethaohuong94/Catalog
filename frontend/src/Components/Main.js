/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import localStorage from 'local-storage';
import Header from './Header';
import Panel from './Panel';
import Register from './User/Register';
import LogIn from './User/LogIn';
import ChangePassword from './User/ChangePassword';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: 0,
        userName: '',
        loggedIn: false,
        accessToken: '',
      } };
    this.state.user = localStorage.get('state').user;
    this.changeState = this.changeState.bind(this);
  }

  changeState(newState) {
    this.setState(newState);
    localStorage.set('state', newState);
  }

  render() {
    const { loggedIn } = this.state.user;
    console.log(loggedIn);
    return (
      <div>
        <Header user={this.state.user} onChangeState={this.changeState} />
        <Switch>
          <Route path="/register" exact render={() => (loggedIn ? <Redirect to="/" /> : <Register onChangeState={this.changeState} />)} />
          <Route path="/login" exact render={() => (loggedIn ? <Redirect to="/" /> : <LogIn onChangeState={this.changeState} />)} />
          <Route path="/changepassword" exact render={() => (loggedIn ? <ChangePassword user={this.state.user} /> : <Redirect to="/login" />)} />
          <Route render={() => <Panel user={this.state.user} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;