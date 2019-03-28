import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showErrorToast, showSuccessToast } from '../../Helpers/toasterHelpers';

class AddItem extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, categoryId, onAddItem } = this.props;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;

    post(`/categories/${categoryId}/items`, { name, description }, accessToken)
      .then((json) => {
        if (!('id' in json)) {
          showErrorToast(json.message);
          return;
        }
        showSuccessToast('Item is successfully created');
        onAddItem({ id: json.id, name, description }, categoryId);
      })
      .catch((error) => {
        showErrorToast(error.message);
        return error;
      });
  }

  render() {
    return (
      <div>
        <h3>This is where a new item is created</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="Item name" name="name" />
            <input type="text" placeholder="Item description" name="description" />
            <button type="submit"> Add </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddItem;