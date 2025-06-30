import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import 'antd/dist/reset.css'; // for AntD v5+
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

