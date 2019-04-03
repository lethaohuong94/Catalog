import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Styles/stylesheet.css';
import 'toastr/build/toastr.min.css';
import Main from './Components/Main';
import store from './store';
import * as actions from './actions';

function mapStateToProps(state) {
  return {
    user: state.user,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
