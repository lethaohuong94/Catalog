/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { put } from '../../helpers/fetch';
import { showSuccessToast, showErrorToast } from '../../helpers/toaster';
import { validateTextInput } from '../../helpers/validators';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    try {
      this.categoryId = this.props.match.params.categoryid;
      this.category = this.props.categories.find(category => category.id === Number(this.categoryId));
      this.state = { name: this.category.name };
    } catch {
      this.state = { name: '' };
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
    const { name } = this.state;

    try {
      validateTextInput('name', name);
    } catch (e) {
      showErrorToast(e.message);
      return;
    }

    put(`/categories/${this.category.id}`, { name }, accessToken)
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
    if (this.category) {
      return (
        <div>
          {this.renderMessage()}
          {this.renderForm()}
        </div>
      );
    }
    return (<Redirect to="/" />);
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(EditCategory));