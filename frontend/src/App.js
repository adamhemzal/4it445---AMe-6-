import React, { Component } from 'react';
//import logo from './logo.svg';
import { Dashboard } from './dashboard/Dashboard';

//import './bootstrap/bootstrap-reboot.min.css';
//import './bootstrap/bootstrap-grid.min.css';
import './weatherIcons/weather-icons.min.css';
import './bootstrap/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>

    );
  }
}

export default App;
