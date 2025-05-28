import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Flowgear } from 'flowgear-webapp';

Flowgear.Sdk.init();

let rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
    <App />
);