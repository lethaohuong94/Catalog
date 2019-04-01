import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, onAddCategory } = this.props;
    const name = event.target.elements.name.value;

    post('/categories', { name }, accessToken)
      .then((response) => {
        if (response.successful) {
          showSuccessToast('Category is successfully created');
          delete response.successful;
          onAddCategory(response);
        }
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