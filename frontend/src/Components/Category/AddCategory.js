import React, { Component } from 'react';
import { post } from '../../Helpers/fetchHelpers';
import { showSuccessToast } from '../../Helpers/toasterHelpers';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { accessToken, onAddCategory } = this.props;
    const { name } = this.state;

    post('/categories', { name }, accessToken)
      .then((response) => {
        if (!response.successful) return;
        showSuccessToast('Category is successfully created');
        delete response.successful;
        onAddCategory(response);
      });
  }

  render() {
    return (
      <div>
        <h3>This is where a category is created</h3>
        <div className="form" onKeyPress={e => this.handleKeyPress(e)}>
          <h5>Please fill the form</h5>
          <input type="text" placeholder="Category name" onChange={e => this.handleChangeName(e)} />
          <button type="submit" onClick={e => this.handleSubmit(e)}> Add </button>
        </div>
      </div>
    );
  }
}

export default AddCategory;