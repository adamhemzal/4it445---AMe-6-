import React, { Component } from 'react';
import { Provider } from 'react-redux';
//import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import AMeDashboard from './dashboard/AMeDashboard';
import { HomePage } from './homepage/HomePage';
import Alert from 'react-s-alert';
import { configureStore } from './store/configureStore.js';
import { CookiesProvider } from 'react-cookie';

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
    const store = configureStore();

    return (
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <div>
              <Alert stack={{ limit: 1 }} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/dashboard/:dashboardId/" component={AMeDashboard} />
              {/* <Route exact path="/authorize" component={Outlook}/> */}
              {/*<Route path="*" component={NotFound}/>*/}
            </div>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
