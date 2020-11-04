import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './components/dashboard';
import { Flowgear } from './components/flowgearSdk';

const rootElement = document.getElementById('root');


Flowgear.Sdk.init();
Flowgear.Sdk.applyStylesheets();

ReactDOM.render(
    <Dashboard />,
    rootElement);


