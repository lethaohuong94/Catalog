import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { get } from '../../Helpers/fetchHelpers';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ id: 0, items: [] }],
      visiting: 0,
    };
    this.changeState = this.changeState.bind(this);
  }

  //fetch data
  componentDidMount() {
    get('/categories')
      .then((json) => {
        this.setState({ categories: json });
      });
  }

  //name should be more specifiy
  changeState(newState) {
    this.setState(newState);
  }

  render() {
    const { categories, visiting } = this.state;
    const { user } = this.props;
    //if data is updated already then render panel
    //change categories in constructor
    if (categories[0].id !== 0) {
      return (
        <div className="panel">
          <LeftPanel categories={categories} visiting={visiting} onChangeState={this.changeState} />
          <RightPanel categories={categories} user={user} onChangeState={this.changeState} />
        </div>
      );
    }
    return (<div />);
  }
}

export default Panel;