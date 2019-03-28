/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class LeftPanel extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, categoryId) {
    event.preventDefault();
    const { categories, history, onChangeState } = this.props;
    const newState = { categories, visiting: categoryId };
    onChangeState(newState);
    history.push(`/category/${categoryId}`);
  }

  render() {
    const { visiting } = this.props;
    return (
      <div className="left-panel">
        <div className="button-container"><Link className="small-button" to="/category/new">Add Category</Link></div>
        <ul>
          {this.props.categories
            .sort((x, y) => y.id - x.id)
            .map(category =>
              <li key={category.id} style={{ background: (category.id === visiting ? '#0658845e' : null) }}>
                <Link to={`/category/${category.id}`} key={category.id} className="category" onClick={event => this.handleClick(event, category.id)}>{category.name}</Link>
              </li>)}
        </ul>
      </div>
    );
  }
}

export default withRouter(LeftPanel);