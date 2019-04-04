/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class LeftPanel extends Component {
  visitingId = () => {
    try {
      const path = this.props.location.pathname;
      const found1 = path.match(/\/category\/\d?/);
      if (found1) {
        const found2 = path.match(/\d+/);
        return Number(found2.join());
      }
      return null;
    } catch {
      return null;
    }
  }

  renderButton() {
    return (
      <div className="button-container"><Link className="small-button" to="/category/new">Add Category</Link></div>
    );
  }

  renderList() {
    const { categories } = this.props;
    const visiting = this.visitingId();
    return (
      <ul>
        {categories.map(category => (
          <li key={category.id} style={{ background: (category.id === visiting ? '#0658845e' : null) }}>
            <Link to={`/category/${category.id}`} key={category.id} className="category">{category.name}</Link>
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