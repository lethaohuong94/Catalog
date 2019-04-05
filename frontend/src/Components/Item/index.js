/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewItem from './ViewItem';
import AddItem from './AddItem';
import EditItem from './EditItem';
import { updateCategories } from '../../actions/category';
import { get } from '../../helpers/fetch';

class Item extends Component {
  refetch = async () => {
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/category/:categoryid/item/:itemid" exact render={() => (
            <ViewItem
              onRefetch={this.refetch}
            />
          )}
          />
          <Route path="/category/:categoryid/item" exact render={() => (
            loggedIn
              ? <AddItem
                onRefetch={this.refetch}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:categoryid/item/:itemid/edit" exact render={() => (
            loggedIn
              ? <EditItem
                onRefetch={this.refetch}
              />
              : <Redirect to="/login" />)}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  categories: state.categories,
});

const mapDispatchToProps = {
  updateCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item));