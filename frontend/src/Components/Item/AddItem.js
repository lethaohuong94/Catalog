import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast, showErrorToast, validateTextInput } from '../../Helpers/helpers';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit() {
    const { accessToken, categoryId, onAddItem } = this.props;
    const { name, description } = this.state;

    try {
      validateTextInput('name', name);
      validateTextInput('description', description);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post(`/categories/${categoryId}/items`, { name, description }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully created');
        onAddItem({ id: response.id, name, description, author_id: response.author_id }, categoryId);
      });
  }

  renderMessage() {
    return (
      <h3>This is where a new item is created</h3>
    );
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Item name" onChange={e => this.handleChangeName(e)} />
        <input type="text" placeholder="Item description" onChange={e => this.handleChangeDescription(e)} />
        <button type="submit" onClick={e => this.handleSubmit(e)}> Add </button>
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

export default AddItem;