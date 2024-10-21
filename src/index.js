import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import HeaderComponent from './components/header/header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HeaderComponent />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
