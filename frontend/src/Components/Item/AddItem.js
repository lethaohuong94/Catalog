/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { post } from '../../helpers/fetch';
import { showSuccessToast, showErrorToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '' };
    try {
      this.categoryId = this.props.match.params.categoryid;
      this.category = this.props.categories.find(category => category.id === Number(this.categoryId));
    } catch {
      this.category = null;
    }
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
    const { accessToken, onRefetch, history } = this.props;
    const { name, description } = this.state;

    try {
      validateTextInput('name', name);
      validateTextInput('description', description);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    post(`/categories/${this.categoryId}/items`, { name, description }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Item is successfully created');
        onRefetch().then(() => history.push(`/category/${this.categoryId}`));
      });
  }

  renderMessage() {
    return (
      <h3>This is where a new item is created</h3>
    );
  }

  renderForm() {
    return (
      <div className="form" onKeyPress={this.handleKeyPress}>
        <h5>Please fill the form</h5>
        <input type="text" placeholder="Item name" name="name" onChange={this.handleInputChange} />
        <input type="text" placeholder="Item description" name="description" onChange={this.handleInputChange} />
        <button onClick={this.handleSubmit}> Add </button>
      </div>
    );
  }

  render() {
    if (this.category) {
      return (
        <div>
          {this.renderMessage()}
          {this.renderForm()}
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(AddItem));