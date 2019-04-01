/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { put } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    const { category } = this.props;
    if (category) this.state = { name: category.name };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, category, onEditCategory } = this.props;
    const { name } = this.state;

    put(`/categories/${category.id}`, { name }, accessToken)
      .then((response) => {
        // if (!('id' in json)) {
        //   showErrorToast(json.message);
        //   return;
        // }
        if (response.successful) {
          showSuccessToast('Category is successfully updated');
          onEditCategory(response);
        }
      });
  }

  render() {
    return (
      <div>
        <h3>Edit category</h3>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <h5>Please fill the form</h5>
            <input type="text" placeholder="new name" name="name" value={this.state.name} onChange={this.handleChange} />
            <button type="submit"> Save change </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditCategory;