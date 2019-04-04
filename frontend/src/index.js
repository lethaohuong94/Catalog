import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './Styles/stylesheet.css';
import 'toastr/build/toastr.min.css';
import Main from './Components/Main';
import store from './Stores/store';

ReactDOM.render(<Provider store={store}><BrowserRouter><Main /></BrowserRouter></Provider>, document.getElementById('root'));
