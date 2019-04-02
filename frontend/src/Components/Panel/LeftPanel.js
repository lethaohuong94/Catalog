import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class LeftPanel extends Component {
  handleClick(event, categoryId) {
    event.preventDefault();
    const { categories, history, onChangeState } = this.props;
    const newState = { categories, visiting: categoryId };
    onChangeState(newState);
    history.push(`/category/${categoryId}`);
  }

  renderButton() {
    return (
      <div className="button-container"><Link className="small-button" to="/category/new">Add Category</Link></div>
    );
  }

  renderList() {
    const { categories, visiting } = this.props;
    return (
      <ul>
        {categories.map(category => (
          <li key={category.id} style={{ background: (category.id === visiting ? '#0658845e' : null) }}>
            <Link to={`/category/${category.id}`} key={category.id} className="category" onClick={e => this.handleClick(e, category.id)}>{category.name}</Link>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="left-panel">
        {this.renderButton()}
        {this.renderList()}
      </div>
    );
  }
}

export default withRouter(LeftPanel);