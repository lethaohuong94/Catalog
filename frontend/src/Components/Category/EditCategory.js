import React, { Component } from 'react';
import { put } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class EditCategory extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, categoryId, onEditCategory } = this.props;
    const name = event.target.elements.name.value;

    put(`/categories/${categoryId}`, { name }, accessToken)
      .then((json) => {
        if (!('id' in json)) {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Category is successfully updated');
        onEditCategory(json);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    return (
      <div>
        <h3>Edit category</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="new name" name="name" />
            <button type="submit"> Save change </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditCategory;