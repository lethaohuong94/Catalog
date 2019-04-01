import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { del } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class ViewCategory extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, category, onDeleteCategory } = this.props;

    del(`/categories/${category.id}`, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Category is successfully deleted');
        onDeleteCategory(category.id);
      });
  }

  renderButtonField() {
    const { category, userId } = this.props;
    return (
      <div className="button-container">
        {(userId === category.author_id) && <Link className="small-button" to={`/category/${category.id}/edit`}>Edit Category</Link>}
        <Link className="small-button" to={`/category/${category.id}/item`}>Add Item</Link>
        {(userId === category.author_id) && <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this category?')) this.handleSubmit(e); }}>delete category</button>}
      </div>
    );
  }

  renderItemList() {
    const { category } = this.props;
    return (
      <div>
        <h3>{`There are ${category.items.length} items in category ${category.name}`}</h3>
        <h5>{`category's author: ${category.author_id}`}</h5>
        <ul>
          {category.items.map(item => <li key={item.id}><Link to={`/category/${category.id}/item/${item.id}`}>{item.name}</Link></li>)}
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