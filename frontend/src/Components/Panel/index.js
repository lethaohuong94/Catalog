/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { get } from '../../helpers/fetch';
import { updateCategories } from '../../actions/category';

class Panel extends Component {
  componentDidMount() {
    get('/categories')
      .then((json) => {
        delete json.successful;
        this.props.updateCategories(json);
      });
  }

  render() {
    const { categories } = this.props;
    if (categories.length > 0) {
      return (
        <div>
          <LeftPanel categories={categories} />
          <RightPanel />
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: state.categories,
});

const mapDispatchToProps = {
  updateCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);