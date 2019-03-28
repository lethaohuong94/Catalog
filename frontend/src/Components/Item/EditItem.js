import React, { Component } from 'react';
import { put } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class EditItem extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, itemId, onEditItem } = this.props;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const categoryId = event.target.elements.category.value;

    put(`/categories/${categoryId}/items/${itemId}`, { name, description }, accessToken)
      .then((json) => {
        if (!('id' in json)) {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Item is successfully updated');
        onEditItem({ id: json.id, name, description }, categoryId);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <h3>This is where an item is editted</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="New name" name="name" />
            <input type="text" placeholder="New description" name="description" />
            <select name="category">
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            <button type="submit"> Save change </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditItem;