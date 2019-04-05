/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { del } from '../../helpers/fetch';
import { showSuccessToast } from '../../helpers/toaster';

class ViewCategory extends Component {
  handleDelete = () => {
    const { accessToken, onRefetch, history } = this.props;

    del(`/categories/${this.category.id}`, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Category is successfully deleted');
        onRefetch();
        history.push('/');
      });
  }

  renderButtonField() {
    const { userId } = this.props;
    return (
      <div className="button-container">
        {(userId === this.category.author_id) && <Link className="small-button" to={`/category/${this.category.id}/edit`}>Edit Category</Link>}
        <Link className="small-button" to={`/category/${this.category.id}/item`}>Add Item</Link>
        {(userId === this.category.author_id) && <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this category?')) this.handleDelete(e); }}>delete category</button>}
      </div>
    );
  }

  renderItemList() {
    return (
      <div>
        <h3>{`There are ${this.category.items.length} items in category ${this.category.name}`}</h3>
        <h5>{`category's author: ${this.category.author_id}`}</h5>
        <ul>
          {this.category.items.map(item => <li key={item.id}><Link to={`/category/${this.category.id}/item/${item.id}`}>{item.name}</Link></li>)}
        </ul>
      </div>
    );
  }

  render() {
    this.categoryId = this.props.match.params.categoryid;
    this.category = this.props.categories.find(category => category.id === Number(this.categoryId));

    if (this.category) {
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

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  userId: state.user.userId,
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(ViewCategory));