import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './Styles/stylesheet.css';
import Main from './Components/Main';
import config from './config';

console.log(config.NAME);

ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, document.getElementById('root'));
