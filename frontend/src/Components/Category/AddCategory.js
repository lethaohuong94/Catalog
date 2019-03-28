import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class AddCategory extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, onAddCategory } = this.props;
    const name = event.target.elements.name.value;

    post('/categories', { name }, accessToken)
      .then((json) => {
        if (!('id' in json)) {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Category is successfully created');
        onAddCategory(json);
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  }

  render() {
    return (
      <div>
        <h3>This is where a category is created</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="Category name" name="name" />
            <button type="submit"> Add </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddCategory;