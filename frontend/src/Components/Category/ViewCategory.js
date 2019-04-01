import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { del } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class ViewCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, category, onDeleteCategory } = this.props;

    del(`/categories/${category.id}`, accessToken)
      .then((json) => {
        if (json.message !== 'Category deleted') {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Category is successfully deleted');
        onDeleteCategory(category.id);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  renderButtonField() {
    const { category, userId } = this.props;
    if (userId === category.author_id) {
      return (
        <div className="button-container">
          <Link className="small-button" to={`/category/${category.id}/edit`}>Edit Category</Link>
          <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this category?')) this.handleSubmit(e); }}>delete category</button>
        </div>
      );
    }
    return (
      <div className="button-container">
        <Link className="small-button" to={`/category/${category.id}/item`}>Add Item</Link>
      </div>
    );
  }

  renderItemList() {
    const { category } = this.props;
    return (
      <div>
        <h3>{`There are ${category.items.length} items in category ${category.name}`}</h3>
        <ul>
          {category.items.sort((x, y) => y.id - x.id).map(item => <li key={item.id}><Link to={`/category/${category.id}/item/${item.id}`}>{item.name}</Link></li>)}
        </ul>
      </div>
    );
  }

  render() {
    const { category } = this.props;
    if (category) {
      return (
        <div>
          {this.renderButtonField()}
          {this.renderItemList()}
        </div>
      );
    }
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

export default ViewCategory;