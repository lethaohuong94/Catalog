import React, { Component } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

class Panel extends Component {
  render() {
    return (
      <div>
        <h3>
          This is Panel
        </h3>
        <LeftPanel />
        <RightPanel />
      </div>
    );
  }
}

export default Panel;