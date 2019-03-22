import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChangeCategory extends Component {
  render() {
    return (
      <div>
        <h3>This is where a category is changed (create / edit)</h3>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ChangeCategory;