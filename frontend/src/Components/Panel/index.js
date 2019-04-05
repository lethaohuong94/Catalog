/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

class Panel extends Component {
  render() {
    const { categories } = this.props;
    if (categories.length > 0) {
      return (
        <div>
          <LeftPanel />
          <RightPanel />
        </div>
      );
    }
    return (<div />);
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(Panel);