/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { del } from '../../helpers/fetch';
import { showSuccessToast } from '../../helpers/toaster';

class ViewItem extends Component {
  constructor(props) {
    super(props);
    try {
      this.categoryId = this.props.match.params.categoryid;
      this.itemId = this.props.match.params.itemid;

      const { categories } = this.props;
      this.category = categories.find(category => category.id === Number(this.categoryId));
      this.item = this.category.items.find(item => item.id === Number(this.itemId));
    } catch {
      this.category = null;
      this.item = null;
    }
  }

  handleDelete = () => {
    if (!(window.confirm('Are you sure you wish to delete this item?'))) return;
    const { accessToken, onRefetch, history } = this.props;

    del(`/items/${this.itemId}`, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully deleted');
        onRefetch().then(() => history.push(`/category/${this.category.id}`));
      });
  }

  renderButtonField(item) {
    const { userId } = this.props;
    if (userId === item.author_id) {
      return (
        <div className="button-container">
          <Link className="small-button" to={`/category/${this.category.id}/item/${this.itemId}/edit`}>Edit Item</Link>
          <button type="button" className="small-button" onClick={this.handleDelete}>delete item</button>
        </div>
      );
    }
    return <div />;
  }

  renderTextField(item) {
    return (
      <div>
        <h3>{item.name}</h3>
        <h5>{item.description}</h5>
        <h5>{`item's author: ${item.author_id}`}</h5>
      </div>
    );
  }

  render() {
    if (this.category && this.item) {
      return (
        <div>
          {this.renderButtonField(this.item)}
          {this.renderTextField(this.item)}
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

export default withRouter(connect(mapStateToProps)(ViewItem));