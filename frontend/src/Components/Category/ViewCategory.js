import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ViewCategory extends Component {
  render() {
    return (
      <div>
        <h3>This is where a category is displayed</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ViewCategory;