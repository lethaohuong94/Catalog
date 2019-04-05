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
  refetch = async () => {
    //can fetch in reducer
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/category/new" exact render={() => (
            loggedIn
              ? <AddCategory
                onRefetch={this.refetch}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:categoryid/edit" exact render={() => (
            loggedIn
              ? <EditCategory
                onRefetch={this.refetch}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:categoryid" exact render={() => (
            <ViewCategory
              onRefetch={this.refetch}
            />
          )}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  updateCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));