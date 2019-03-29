import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { del } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class ViewItem extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, category, itemId, onDeleteItem } = this.props;

    del(`/items/${itemId}`, accessToken)
      .then((json) => {
        if (json.message !== 'Item deleted') {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Item is successfully deleted');
        onDeleteItem(itemId, category.id);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    const { category, itemId, history, userId } = this.props;
    if (category) {
      const item = category.items.find(item => item.id === Number(itemId));
      console.log(userId);
      console.log(category.author_id);
      if (userId === category.author_id) {
        return (
          <div>
            <div className="button-container">
              <Link className="small-button" to={`/category/${category.id}/item/${itemId}/edit`}>Edit Item</Link>
              <button type="button" className="small-button" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleSubmit(e); }}>delete item</button>
            </div>
            <div>
              {item
                ? (<h3>{item.name}</h3>)
                : (<h3>Item does not exist</h3>)
            }
              {item
                ? (<h5>{item.description}</h5>)
                : (<h3>No description</h3>)
            }
            </div>
          </div>
        );
      }
      return (
        <div>
          {item
            ? (<h3>{item.name}</h3>)
            : (<h3>Item does not exist</h3>)
                }
          {item
            ? (<h5>{item.description}</h5>)
            : (<h3>No description</h3>)
                }
        </div>
      );
    }
    return (
      <div>
        {history.push('/')}
      </div>
    );
  }
}

export default withRouter(ViewItem);