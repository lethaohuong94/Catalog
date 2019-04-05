/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get } from '../helpers/fetch';
import Header from './Header';
import Panel from './Panel';
import Register from './User/Register';
import LogIn from './User/LogIn';
import ChangePassword from './User/ChangePassword';
import { updateCategories } from '../actions/category';

class App extends Component {
  componentDidMount() {
    get('/categories')
      .then((json) => {
        delete json.successful;
        this.props.updateCategories(json);
      });
  }

  renderLoggedIn() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/register" exact render={() => <Redirect to="/" />} />
          <Route path="/login" exact render={() => <Redirect to="/" />} />
          <Route path="/changepassword" exact render={() => <ChangePassword />} />
          <Route path="/category/:categoryid" render={() => <Panel />} />
          <Route render={() => <Panel />} />
        </Switch>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/register" exact render={() => <Register />} />
          <Route path="/login" exact render={() => <LogIn />} />
          <Route path="/changepassword" exact render={() => <Redirect to="/login" />} />
          <Route path="/category/:categoryid" render={() => <Panel />} />
          <Route render={() => <Panel />} />
        </Switch>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    return (user.loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn());
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  updateCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));