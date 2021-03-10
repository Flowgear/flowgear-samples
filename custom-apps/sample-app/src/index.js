import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Dashboard } from './components/dashboard';
import { Flowgear } from './components/flowgearSdk';
import 'bootstrap/dist/css/bootstrap.css';

const rootElement = document.getElementById('root');

Flowgear.Sdk.init();
Flowgear.Sdk.applyStylesheets();

ReactDOM.render(<Dashboard />, rootElement);
