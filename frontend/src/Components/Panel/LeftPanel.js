/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class LeftPanel extends Component {
  renderButton() {
    return (
      <div className="button-container"><Link className="small-button" to="/category/new">Add Category</Link></div>
    );
  }

  renderList() {
    const { categories } = this.props;
    const visiting = Number(this.props.match.params.categoryid);
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

const mapStateToProps = state => ({
  categories: state.categories,
});

export default withRouter(connect(mapStateToProps)(LeftPanel));