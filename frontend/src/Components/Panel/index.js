/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { get } from '../../Helpers/fetchHelpers';
import * as actions from '../../actions';

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
    console.log('panel index');
    console.log(this.props.categories);
    if (categories.length > 0) {
      return (
        <div className="panel">
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);