import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import './index.css';
import 'typeface-roboto/index.css'
import App from './App';

const Renderer = <HotContainer><App /></HotContainer>;

let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root'
  document.body.appendChild(rootElement);
}
ReactDOM.render(Renderer, rootElement);

if (process.env.NODE_ENV !== 'production') module.hot.accept();
