/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ViewItem from './ViewItem';
import AddItem from './AddItem';
import EditItem from './EditItem';

class Item extends Component {
  constructor() {
    super();
    this.categories = [];
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  indexFromId(categoryId) {
    this.categories = this.props.categories;
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
    const index = this.indexFromId(categoryId);
    this.categories[index].items = this.categories[index].items.filter(item => item.id !== Number(edittedItem.id));
    this.categories[index].items = this.categories[index].items.concat([edittedItem]);
    this.props.onChangeState({ categories: this.categories, visiting: categoryId });
    this.props.history.push(`/category/${categoryId}/item/${edittedItem.id}`);
  }

  render() {
    const { categories, loggedIn, accessToken } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/category/:categoryid/item/:itemid" exact render={params =>
            <ViewItem
              accessToken={accessToken}
              categoryId={params.match.params.categoryid}
              itemId={params.match.params.itemid}
              category={categories.find(category => category.id === Number(params.match.params.categoryid))}
              onDeleteItem={this.deleteItem}
            />}
          />
          <Route path="/category/:categoryid/item" exact render={params =>
            (loggedIn
              ? <AddItem
                accessToken={accessToken}
                categoryId={params.match.params.categoryid}
                onAddItem={this.addItem}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:categoryid/item/:itemid/edit" exact render={params =>
            (loggedIn
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