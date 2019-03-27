import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

class Panel extends Component {
  render() {
    return (
      <div className="panel">
        <LeftPanel />
        <RightPanel />
      </div>
    );
  }
}

export default Panel;