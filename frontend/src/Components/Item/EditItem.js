/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { put } from '../../helpers/fetch';
import { showSuccessToast, showErrorToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';

class EditItem extends Component {
  constructor(props) {
    super(props);
    try {
      const { categories, categoryId, itemId } = this.props;
      this.category = categories.find(category => category.id === Number(categoryId));
      this.item = this.category.items.find(item => item.id === Number(itemId));

      const { name, description } = this.item;
      this.state = { name, description, categoryId };
    } catch {
      this.state = {};
    }
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { accessToken, itemId, onRefetch, history } = this.props;
    const { name, description, categoryId } = this.state;

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
        onRefetch().then(() => history.push(`/category/${response.category_id}/item/${response.id}`));
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
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="New name" name="name" value={name} onChange={this.handleInputChange} />
        <input type="text" placeholder="New description" name="description" value={description} onChange={this.handleInputChange} />
        <select name="categoryId" value={categoryId} onChange={this.handleInputChange}>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <button onClick={this.handleSubmit}> Save change </button>
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

export default withRouter(EditItem);