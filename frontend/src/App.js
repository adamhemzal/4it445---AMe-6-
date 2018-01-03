import React, { Component } from 'react';
//import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import { AMeDashboard } from './dashboard/AMeDashboard';
import { Admin } from './admin/Admin';
import { HomePage } from './homepage/HomePage';
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
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/dashboard/:dashboardId/" component={AMeDashboard}/>
          <Route exact path="/dashboard/:dashboardId/admin" component={Admin}/>
          {/* <Route exact path="/authorize" component={Outlook}/> */}
          {/*<Route path="*" component={NotFound}/>*/}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
