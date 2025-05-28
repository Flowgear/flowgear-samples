import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Flowgear } from 'flowgear-webapp';

Flowgear.Sdk.init();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);