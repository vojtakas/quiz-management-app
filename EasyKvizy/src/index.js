import React from 'react';

import './index.css';
import App from './App';

import './i18n';  // Importing i18n

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
