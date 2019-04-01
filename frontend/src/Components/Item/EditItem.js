import React, { Component } from 'react';
import { put } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class EditItem extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, itemId, onEditItem } = this.props;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;
    const categoryId = event.target.elements.category.value;

    put(`/categories/${categoryId}/items/${itemId}`, { name, description }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully updated');
        onEditItem({ id: response.id, name, description, author_id: response.author_id }, categoryId);
      });
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <h3>This is where an item is editted</h3>
        <div className="form">
          <form onSubmit={e => this.handleSubmit(e)}>
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