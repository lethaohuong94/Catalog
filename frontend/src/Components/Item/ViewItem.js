import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { del } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class ViewItem extends Component {
  //TODO: change function name
  deleteItem(event) {
    event.preventDefault();
    const { accessToken, category, itemId, onDeleteItem } = this.props;

    del(`/items/${itemId}`, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully deleted');
        onDeleteItem(itemId, category.id);
      });
  }

  renderButtonField(item) {
    const { category, itemId, userId } = this.props;
    if (userId === item.author_id) {
      return (
        <div className="button-container">
          <Link className="small-button" to={`/category/${category.id}/item/${itemId}/edit`}>Edit Item</Link>
          <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e); }}>delete item</button>
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

export default ViewItem;