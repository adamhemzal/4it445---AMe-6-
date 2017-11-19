import React, { Component } from 'react';
//import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard } from './dashboard/Dashboard';
import { Admin } from './admin/Admin';
import Alert from 'react-s-alert';

//import './bootstrap/bootstrap-reboot.min.css';
//import './bootstrap/bootstrap-grid.min.css';
import './font-awesome/font-awesome.min.css';
import './weatherIcons/weather-icons.min.css';
import './bootstrap/bootstrap.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Alert stack={{limit: 1}} />
          <Route exact path="/" component={Dashboard}/>
          <Route path="/admin" component={Admin}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
