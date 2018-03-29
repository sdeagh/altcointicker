import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/light-bootstrap-dashboard.css';
import 'cryptocoins-icons/webfont/cryptocoins.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// import './assets/css/pe-icon-7-stroke.css';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
