import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wrapper from './components/wrapper'

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById('root')
);

reportWebVitals();
