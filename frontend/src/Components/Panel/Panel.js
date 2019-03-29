import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { get } from '../../Helpers/fetchHelpers';

class Panel extends Component {
  constructor() {
    super();
    this.state = {
      categories: [{ id: 0, items: [] }],
      visiting: 0,
    };
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    get('/categories')
      .then((json) => {
        this.setState({ categories: json });
      });
  }

  changeState(newState) {
    this.setState(newState);
  }

  render() {
    const { categories, visiting } = this.state;
    //if data is updated already then render panel
    if (categories[0].id !== 0) {
      return (
        <div className="panel">
          <LeftPanel categories={categories} visiting={visiting} onChangeState={this.changeState} />
          <RightPanel categories={categories} {...this.props} onChangeState={this.changeState} />
        </div>
      );
    }
    return (<div />);
  }
}

export default Panel;