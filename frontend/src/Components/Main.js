import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import localStorage from 'local-storage';
import Header from './Header';
import Panel from './Panel/Panel';
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
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.setState(localStorage.get('state'));
  }

  changeState(newState) {
    this.setState(newState);
    localStorage.set('state', newState);
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <Header {...this.state} onChangeState={this.changeState} />
        <Switch>
          <Route path="/register" exact render={() => (loggedIn ? <Redirect to="/" /> : <Register onChangeState={this.changeState} />)} />
          <Route path="/login" exact render={() => (loggedIn ? <Redirect to="/" /> : <LogIn onChangeState={this.changeState} />)} />
          <Route path="/changepassword" exact render={() => (loggedIn ? <ChangePassword {...this.state} /> : <Redirect to="/login" />)} />
          <Route render={() => <Panel {...this.state} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;