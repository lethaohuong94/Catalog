/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Header from './Header';
import Panel from './Panel';
import Register from './User/Register';
import LogIn from './User/LogIn';
import ChangePassword from './User/ChangePassword';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      userName: '',
      loggedIn: false,
      accessToken: 'token',
    };
    this.ChangeState = this.ChangeState.bind(this);
  }

  ChangeState(newState) {
    this.setState(newState);
  }

  render() {
    console.log(this.state.loggedIn);
    return (
      <div>
        <Header {...this.state} onChangeState={this.ChangeState} />
        <Switch>
          <Route path="/register" exact render={() => (this.state.loggedIn ? <Redirect to="/" /> : <Register />)} />
          <Route path="/login" exact render={() => (this.state.loggedIn ? <Redirect to="/" /> : <LogIn onChangeState={this.ChangeState} />)} />
          <Route path="/changepassword" exact render={() => (this.state.loggedIn ? <ChangePassword {...this.state} /> : <Redirect to="/" />)} />
          <Route component={Panel} />
        </Switch>
      </div>
    );
  }
}

export default Main;