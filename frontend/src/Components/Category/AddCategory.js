import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast, validateTextInput, showErrorToast } from '../../Helpers/helpers';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit() {
    const { accessToken, onAddCategory, history } = this.props;
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
        onAddCategory().then(() => history.push(`/category/${response.id}`));
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
        <input type="text" name="name" placeholder="Category name" onChange={this.handleChangeName} />
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

export default withRouter(AddCategory);