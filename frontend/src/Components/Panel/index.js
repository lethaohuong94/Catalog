/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { get } from '../../Helpers/fetchHelpers';
import { updateCategories } from '../../Actions/categoryAction';

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

function mapStateToProps(state) {
  return {
    user: state.user,
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  updateCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);