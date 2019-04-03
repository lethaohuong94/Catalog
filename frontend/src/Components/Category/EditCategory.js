/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { put } from '../../Helpers/fetchHelpers';
import { showSuccessToast, showErrorToast, validateTextInput } from '../../Helpers/helpers';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    if (this.props.category) this.state = { name: this.props.category.name };
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
    const { accessToken, category, onEditCategory } = this.props;
    const { name } = this.state;

    try {
      validateTextInput('name', name);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    put(`/categories/${category.id}`, { name }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Category is successfully updated');
        onEditCategory(`/category/${response.id}`);
      });
  }

  renderMessage() {
    return (
      <h3>Edit category</h3>
    );
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="New name" value={this.state.name} onChange={e => this.handleChangeName(e)} />
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

export default withRouter(EditCategory);