import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PendingSectionsDemo from './PendingSectionsDemo';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PendingSectionsDemo />, document.getElementById('root'));
registerServiceWorker();
