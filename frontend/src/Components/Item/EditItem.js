import React, { Component } from 'react';
import { put } from '../../Helpers/fetchHelpers';
import { showSuccessToast, showErrorToast, validateTextInput } from '../../Helpers/helpers';

class EditItem extends Component {
  constructor(props) {
    super(props);
    try {
      const { categories, categoryId, itemId } = this.props;
      this.category = categories.find(category => category.id === Number(categoryId));
      this.item = this.category.items.find(item => item.id === Number(itemId));

      const { name, description } = this.item;
      this.state = { name, description, categoryId, oldCategoryId: categoryId };
    } catch {
      this.state = {};
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeCategory(event) {
    this.setState({ categoryId: event.target.value });
  }

  handleSubmit() {
    const { accessToken, itemId, onEditItem } = this.props;
    const { name, description, categoryId, oldCategoryId } = this.state;

    try {
      validateTextInput('name', name);
      validateTextInput('description', description);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    put(`/categories/${categoryId}/items/${itemId}`, { name, description }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully updated');
        onEditItem({ id: response.id, name, description, author_id: response.author_id, category_id: response.category_id }, oldCategoryId);
      });
  }

  renderMessage() {
    return (
      <h3>This is where an item is editted</h3>
    );
  }

  renderForm() {
    const { categories } = this.props;
    const { name, description, categoryId } = this.state;
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="New name" value={name} onChange={e => this.handleChangeName(e)} />
        <input type="text" placeholder="New description" value={description} onChange={e => this.handleChangeDescription(e)} />
        <select name="category" value={categoryId} onChange={e => this.handleChangeCategory(e)}>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <button type="submit" onClick={e => this.handleSubmit(e)}> Save change </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderMessage()}
        {this.renderForm()}
      </div>
    );
  }
}

export default EditItem;