import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Item from '../Item';
import Category from '../Category';

class RightPanel extends Component {
  render() {
    return (
      <div className="right-panel">
        <Switch>
          <Route path="/category/:categoryid/item/" render={() => <Item />} />
          <Route path="/category/" render={() => <Category />} />
          <Route render={() => <h3>Welcome to Catalog App</h3>} />
        </Switch>
      </div>
    );
  }
}

export default RightPanel;