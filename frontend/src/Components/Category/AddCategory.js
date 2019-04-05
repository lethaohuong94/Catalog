/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { post } from '../../helpers/fetch';
import { showSuccessToast, showErrorToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleKeyPress= (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit = () => {
    const { accessToken, onRefetch, history } = this.props;
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
        onRefetch().then(() => history.push(`/category/${response.id}`));
      });
  }

  renderMessage() {
    return (
      <h3>This is where a category is created</h3>
    );
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="text" name="name" placeholder="Category name" onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}> Add </button>
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

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
});

export default withRouter(connect(mapStateToProps)(AddCategory));