import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, categoryId, onAddItem } = this.props;
    const name = event.target.elements.name.value;
    const description = event.target.elements.description.value;

    post(`/categories/${categoryId}/items`, { name, description }, accessToken)
      .then((response) => {
        if (response.successful) {
          showSuccessToast('Item is successfully created');
          onAddItem({ id: response.id, name, description, author_id: response.author_id }, categoryId);
        }
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