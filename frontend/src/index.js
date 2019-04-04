import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/stylesheet.css';
import 'toastr/build/toastr.min.css';
import Main from './components/Main';
import store from './store';

ReactDOM.render(<Provider store={store}><BrowserRouter><Main /></BrowserRouter></Provider>, document.getElementById('root'));
