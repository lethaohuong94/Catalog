/* eslint-disable no-alert */
import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { del } from '../../helpers/fetch';
import { showSuccessToast } from '../../helpers/toaster';

class ViewItem extends Component {
  handleDelete = () => {
    if (!(window.confirm('Are you sure you wish to delete this item?'))) return;
    const { accessToken, category, itemId, onRefetch, history } = this.props;

    del(`/items/${itemId}`, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully deleted');
        onRefetch().then(() => history.push(`/category/${category.id}`));
      });
  }

  renderButtonField(item) {
    const { category, itemId, userId } = this.props;
    if (userId === item.author_id) {
      return (
        <div className="button-container">
          <Link className="small-button" to={`/category/${category.id}/item/${itemId}/edit`}>Edit Item</Link>
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
    const { category, itemId } = this.props;
    if (category) {
      const item = category.items.find(item => item.id === Number(itemId));
      if (item) {
        return (
          <div>
            {this.renderButtonField(item)}
            {this.renderTextField(item)}
          </div>
        );
      }
    }
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

export default withRouter(ViewItem);