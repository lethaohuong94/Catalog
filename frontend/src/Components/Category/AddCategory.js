import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast, validateTextInput, showErrorToast } from '../../Helpers/helpers';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit() {
    const { accessToken, onAddCategory } = this.props;
    const { name } = this.state;

    try {
      validateTextInput('name', name);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post('/categories', { name }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Category is successfully created');
        delete response.successful;
        onAddCategory(response);
      });
  }

  renderMessage() {
    return (
      <h3>This is where a category is created</h3>
    );
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Category name" onChange={e => this.handleChangeName(e)} />
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

export default AddCategory;