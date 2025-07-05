import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import 'antd/dist/reset.css'; // for AntD v5+
import App from './App';
import './i18n'; // make sure the path is correct
import "./styles/_keyframe-animations.scss";
import "./styles/_variables.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

