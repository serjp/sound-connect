import 'react-hot-loader'; // Make sure react-hot-loader is required before react and react-dom
import './api';
import 'react-virtualized/styles.css';
import './styles/index.less';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// TODO: add eslint & prettier
// TODO: use Mobx in strict mode (useStrict)
// TODO: refactor styles
// TODO: refactor all to Function comps with hooks
