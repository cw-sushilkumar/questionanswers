import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// eslint-disable-next-line no-unused-vars
import css from './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
serviceWorker.register();
