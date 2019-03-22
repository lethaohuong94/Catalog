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
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/changepassword" exact component={ChangePassword} />
          <Route component={Panel} />
        </Switch>
      </div>
    );
  }
}

export default Main;