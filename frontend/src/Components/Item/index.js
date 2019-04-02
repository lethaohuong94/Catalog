/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ViewItem from './ViewItem';
import AddItem from './AddItem';
import EditItem from './EditItem';

class Item extends Component {
  constructor(props) {
    super(props);
    if (this.props.categories) this.categories = this.props.categories;
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  //save index into separate array
  indexFromId(categoryId) {
    return this.categories.findIndex(category => category.id === Number(categoryId));
  }

  addItem(newItem, categoryId) {
    const index = this.indexFromId(categoryId);
    this.categories[index].items = this.categories[index].items.concat([newItem]);
    this.props.onChangeState({ categories: this.categories, visiting: categoryId });
    this.props.history.push(`/category/${categoryId}`);
  }

  deleteItem(itemId, categoryId) {
    const index = this.indexFromId(categoryId);
    this.categories[index].items = this.categories[index].items.filter(item => item.id !== Number(itemId));
    this.props.onChangeState({ categories: this.categories, visiting: categoryId });
    this.props.history.push(`/category/${categoryId}`);
  }

  editItem(edittedItem, categoryId) {
    //delete item from old category
    const index = this.indexFromId(categoryId);
    this.categories[index].items = this.categories[index].items.filter(item => item.id !== Number(edittedItem.id));
    //add item into new category
    const destination = this.indexFromId(Number(edittedItem.category_id));
    this.categories[destination].items = this.categories[destination].items.concat([edittedItem]);
    this.props.onChangeState({ categories: this.categories, visiting: categoryId });
    this.props.history.push(`/category/${edittedItem.category_id}/item/${edittedItem.id}`);
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
              onDeleteItem={this.deleteItem}
              userId={userId}
            />
          )}
          />
          <Route path="/category/:categoryid/item" exact render={params => (
            loggedIn
              ? <AddItem
                accessToken={accessToken}
                categoryId={params.match.params.categoryid}
                onAddItem={this.addItem}
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
                onEditItem={this.editItem}
              />
              : <Redirect to="/login" />)}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Item);