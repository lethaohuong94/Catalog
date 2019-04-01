/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ViewCategory from './ViewCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

class Category extends Component {
  constructor(props) {
    super(props);
    this.categories = [];
    this.addCategory = this.addCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
  }

  componentDidMount() {
    this.categories = this.props.categories;
  }

  addCategory(newCategory) {
    this.categories = this.categories.concat([newCategory]);
    this.props.onChangeState({ categories: this.categories, visiting: newCategory.id });
    this.props.history.push(`/category/${newCategory.id}`);
  }

  deleteCategory(categoryId) {
    //move all item from deleted category to 'Unspecifed'
    const category = this.categories.find(category => category.id === Number(categoryId));
    const defaultIndex = this.categories.findIndex(category => category.name === 'Unspecified');
    this.categories[defaultIndex].items = this.categories[defaultIndex].items.concat(category.items);
    //delete category
    this.categories = this.categories.filter(category => category.id !== Number(categoryId));
    this.props.onChangeState({ categories: this.categories, visiting: 0 });
    this.props.history.push('/');
  }

  editCategory(edittedCategory) {
    this.categories = this.categories.filter(category => category.id !== Number(edittedCategory.id));
    this.categories = this.categories.concat([edittedCategory]);
    this.props.onChangeState({ categories: this.categories, visiting: edittedCategory.id });
    this.props.history.push(`/category/${edittedCategory.id}`);
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
                onAddCategory={this.addCategory}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id/edit" exact render={params => (
            loggedIn
              ? <EditCategory
                accessToken={accessToken}
                categoryId={params.match.params.id}
                onEditCategory={this.editCategory}
              />
              : <Redirect to="/login" />)}
          />
          <Route path="/category/:id" exact render={params => (
            <ViewCategory
              accessToken={accessToken}
              userId={userId}
              category={categories.find(category => category.id === Number(params.match.params.id))}
              onDeleteCategory={this.deleteCategory}
            />
          )}
          />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Category);