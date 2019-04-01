import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Item from '../Item';
import Category from '../Category';

class RightPanel extends Component {
  render() {
    const { categories, user, onChangeState } = this.props;
    return (
      <div className="right-panel">
        <Switch>
          <Route path="/category/:categoryid/item/" render={() => <Item categories={categories} user={user} onChangeState={onChangeState} />} />
          <Route path="/category/" render={() => <Category categories={categories} user={user} onChangeState={onChangeState} />} />
          <Route render={() => <h3>Welcome to Catalog App</h3>} />
        </Switch>
      </div>
    );
  }
}

export default RightPanel;