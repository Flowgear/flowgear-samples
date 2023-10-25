import React from 'react';
import ReactDOM from 'react-dom';
import { Flowgear } from 'flowgear-webapp';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import { SamppleApp } from './components/sampleApp';

const rootElement = document.getElementById('root');

Flowgear.Sdk.init();

ReactDOM.render(<SamppleApp />, rootElement);
