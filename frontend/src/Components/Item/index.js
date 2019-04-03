/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewItem from './ViewItem';
import AddItem from './AddItem';
import EditItem from './EditItem';
import * as actions from '../../actions';
import { get } from '../../Helpers/fetchHelpers';

class Item extends Component {
  constructor(props) {
    super(props);
    //if (this.props.categories) this.categories = this.props.categories;
    // this.addItem = this.addItem.bind(this);
    // this.deleteItem = this.deleteItem.bind(this);
    // this.editItem = this.editItem.bind(this);
    this.refetchThenRedirect = this.refetchThenRedirect.bind(this);
  }

  // async addItem(newPath) {
  //   const categories = await get('/categories').then(json => json);
  //   this.props.updateCategories(categories);
  //   this.props.history.push(newPath);
  // }

  // async deleteItem(newPath) {
  //   const categories = await get('/categories').then(json => json);
  //   this.props.updateCategories(categories);
  //   this.props.history.push(newPath);
  // }

  // async editItem(newPath) {
  //   const categories = await get('/categories').then(json => json);
  //   this.props.updateCategories(categories);
  //   this.props.history.push(newPath);
  // }

  async refetchThenRedirect(newPath) {
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
    this.props.history.push(newPath);
  }

  render() {
    const { categories, user } = this.props;
    const { loggedIn, accessToken, userId } = user;
    return (
      <div>
        <Switch>
          <Route path="/category/:categoryid/item/:itemid" exact render={params => (
            <ViewItem
              accessToken={accessToken}
              categoryId={params.match.params.categoryid}
              itemId={params.match.params.itemid}
              category={categories.find(category => category.id === Number(params.match.params.categoryid))}
              onDeleteItem={this.refetchThenRedirect}
              userId={userId}
            />
          )}
          />
          <Route path="/category/:categoryid/item" exact render={params => (
            loggedIn
              ? <AddItem
                accessToken={accessToken}
                categoryId={params.match.params.categoryid}
                onAddItem={this.refetchThenRedirect}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:categoryid/item/:itemid/edit" exact render={params => (
            loggedIn
              ? <EditItem
                accessToken={accessToken}
                categories={categories}
                categoryId={params.match.params.categoryid}
                itemId={params.match.params.itemid}
                onEditItem={this.refetchThenRedirect}
              />
              : <Redirect to="/login" />)}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item));