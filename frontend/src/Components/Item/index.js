/* eslint-disable no-unused-vars */
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
import { updateCategories } from '../../Actions/categoryAction';
import { get } from '../../Helpers/fetchHelpers';

class Item extends Component {
  constructor(props) {
    super(props);
    this.refetch = this.refetch.bind(this);
  }

  async refetch() {
    const categories = await get('/categories').then(json => json);
    this.props.updateCategories(categories);
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
              userId={userId}
              categoryId={params.match.params.categoryid}
              itemId={params.match.params.itemid}
              category={categories.find(category => category.id === Number(params.match.params.categoryid))}
              onDeleteItem={this.refetch}
            />
          )}
          />
          <Route path="/category/:categoryid/item" exact render={params => (
            loggedIn
              ? <AddItem
                accessToken={accessToken}
                categoryId={params.match.params.categoryid}
                onAddItem={this.refetch}
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
                onEditItem={this.refetch}
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }

const mapDispatchToProps = {
  updateCategories,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item));