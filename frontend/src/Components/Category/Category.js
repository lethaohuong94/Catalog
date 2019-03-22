import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import ViewCategory from './ViewCategory';
import ChangeCategory from './ChangeCategory';

class Panel extends Component {
  render() {
    return (
      <div>
        <h3>
          This is Panel
        </h3>
        <ViewCategory />
        <ChangeCategory />
        <Switch>
          <Route path="/category/:id" component={ViewCategory} />
          <Route path="/category/new" component={ChangeCategory} />
          <Route path="/category/:id/edit" component={ChangeCategory} />
        </Switch>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Panel;