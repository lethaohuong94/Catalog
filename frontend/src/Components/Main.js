import React, { Component } from 'react';
import {
  Route,
  Switch,
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
      loggedIn: false,
      accessToken: 'token',
    };
    this.ChangeState = this.ChangeState.bind(this);
  }

  ChangeState(newState) {
    this.setState(() => newState);
  }

  render() {
    return (
      <div>
        <Header {...this.state} onChangeState={this.ChangeState} />
        <Switch>
          <Route path="/register" exact render={() => <Register {...this.state} />} />
          <Route path="/login" exact render={() => <LogIn {...this.state} onChangeState={this.ChangeState} />} />
          <Route path="/changepassword" exact render={() => <ChangePassword {...this.state} onChangeState={this.ChangeState} />} />
          <Route component={Panel} />
        </Switch>
      </div>
    );
  }
}

export default Main;