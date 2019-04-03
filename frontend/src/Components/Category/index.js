/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewCategory from './ViewCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import * as actions from '../../actions';
import { get } from '../../Helpers/fetchHelpers';

class Category extends Component {
  constructor(props) {
    super(props);
    this.refetchThenRedirect = this.refetchThenRedirect.bind(this);
  }

  async refetchThenRedirect(newPath) {
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
    this.props.history.push(newPath);
  }

  render() {
    const { categories, user } = this.props;
    const { loggedIn, userId, accessToken } = user;
    return (
      <div>
        <Switch>
          <Route path="/category/new" exact render={() => (
            loggedIn
              ? <AddCategory
                accessToken={accessToken}
                onAddCategory={this.refetchThenRedirect}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id/edit" exact render={params => (
            loggedIn
              ? <EditCategory
                accessToken={accessToken}
                category={categories.find(category => category.id === Number(params.match.params.id))}
                onEditCategory={this.refetchThenRedirect}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id" exact render={params => (
            <ViewCategory
              accessToken={accessToken}
              userId={userId}
              category={categories.find(category => category.id === Number(params.match.params.id))}
              onDeleteCategory={this.refetchThenRedirect}
            />
          )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));