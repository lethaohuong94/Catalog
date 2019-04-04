/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { put } from '../../helpers/fetch';
import { showSuccessToast, showErrorToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    if (this.props.category) this.state = { name: this.props.category.name };
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit = () => {
    const { accessToken, category, onRefetch, history } = this.props;
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
        onRefetch().then(() => history.push(`/category/${response.id}`));
      });
  }

  renderMessage() {
    return (
      <h3>Edit category</h3>
    );
  }

  renderForm() {
    const { name } = this.state;
    return (
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="New name" value={name} name="name" onChange={this.handleInputChange} />
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

export default withRouter(EditCategory);