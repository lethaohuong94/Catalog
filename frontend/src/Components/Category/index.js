/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ViewCategory from './ViewCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import { updateCategories } from '../../actions/category';
import { get } from '../../helpers/fetch';

class Category extends Component {
  async refetch() {
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
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
                onRefetch={() => this.refetch()}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id/edit" exact render={params => (
            loggedIn
              ? <EditCategory
                accessToken={accessToken}
                category={categories.find(category => category.id === Number(params.match.params.id))}
                onRefetch={() => this.refetch()}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id" exact render={params => (
            <ViewCategory
              accessToken={accessToken}
              userId={userId}
              category={categories.find(category => category.id === Number(params.match.params.id))}
              onRefetch={() => this.refetch()}
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

const mapDispatchToProps = {
  updateCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));