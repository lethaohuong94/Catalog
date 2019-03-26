import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './Styles/stylesheet.css';
import 'toastr/build/toastr.min.css';
import Main from './Components/Main';

ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));
