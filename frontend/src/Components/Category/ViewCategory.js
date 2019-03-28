/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { del } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class ViewCategory extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, category } = this.props;

    del(`/categories/${category.id}`, accessToken)
      .then((json) => {
        if (json.message !== 'Category deleted') {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Category is successfully deleted');
        this.props.onDeleteCategory(category.id);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    const { category, userId } = this.props;
    if (category) console.log(category);
    if (category) {
      const numItem = category.items.length;
      if (userId === category.author_id) {
        return (
          <div>
            <div className="button-container">
              <Link className="small-button" to={`/category/${category.id}/edit`}>Edit Category</Link>
              <Link className="small-button" to={`/category/${category.id}/item`}>Add Item</Link>
              <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this category?')) this.handleSubmit(e); }}>delete category</button>
            </div>
            <h3>{`There are ${numItem} items in category ${category.name}`}</h3>
            <ul>
              {category.items.sort((x, y) => y.id - x.id).map(item => <li key={item.id}><Link to={`/category/${category.id}/item/${item.id}`}>{item.name}</Link></li>)}
            </ul>
          </div>
        );
      }
      return (
        <div>
          <div className="button-container">
            <Link className="small-button" to={`/category/${category.id}/item`}>Add Item</Link>
          </div>
          <h3>{`There are ${numItem} items in category ${category.name}`}</h3>
          <ul>
            {category.items.sort((x, y) => y.id - x.id).map(item => <li key={item.id}><Link to={`/category/${category.id}/item/${item.id}`}>{item.name}</Link></li>)}
          </ul>
        </div>
      );
    }
    return (
      <div>
        {this.props.history.push('/')}
      </div>
    );
  }
}

export default withRouter(ViewCategory);