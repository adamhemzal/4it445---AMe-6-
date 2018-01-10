import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import React, { Component } from 'react';
import api from '../../api.js';
import { Route, Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';

import { connect } from 'react-redux';
import { login } from './actions';
import {
  getLoginState,
  getUser,
  getLoginMessage,
  isAuthenticated,
  isAuthenticating,
} from './reducer';

export class LoginMenuRaw extends Component {


  constructor(props) {
    console.log("PROPS", props);
    super(props);
    this.state = {
      userInput: "",
      passInput: "",
      doRedirect: false,
      dashboardId: this.props.dashboardId,
    }
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePasswd = this.handleChangePasswd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  handleChangePasswd(e) {
    this.setState({
      passInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {userInput, passInput, doRedirect} = this.state;
    api({
      method: 'post',
      url: 'login',
      withCredentials: true,
      headers: {'Content-Type': 'application/json'},
      data: {
        username: userInput,
        password: passInput
      }
    }).then((res) => {
      const { success, message, user } = res.data;
      console.log(res);
      if (success) {
        this.setState({
          doRedirect: true
        });
      } else {
        Alert.error('<div class="alert-content"><h5>' + message + '</h5></div>', {
          html: true,
          position: 'top',
          effect: 'flip',
          beep: false,
          timeout: 5000,
        });
      }
    });
  }

  render() {
    const { dashboardId, doRedirect } = this.state;

    if (doRedirect) {
      return <Redirect to={"/dashboard/" + dashboardId + "/admin"} />;
    }

    return(
      <Form ref={c => { this.form = c }} method="POST" name="login-form" className="menu-form" onSubmit={this.handleSubmit}>
        <div className="menu-form--index">
          <div className="menu-form--items">
            <label htmlFor="user">Username</label>
            <Input type="text" id="user" name="username" onChange={this.handleChangeUser} value={this.state.userInput} tabIndex="1" required/>
            <label htmlFor="pass">Password</label>
            <Input type="password" id="pass" name="password" onChange={this.handleChangePasswd} value={this.state.passInput} tabIndex="2" required/>
          </div>
          <button className="login-button" type="submit" tabIndex="3">Login</button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (storeState) => {
  const loginState = getLoginState(storeState);

  return {
    user: getUser(loginState),
    loginMessage: getLoginMessage(loginState),
    isAuthenticated: isAuthenticated(loginState),
    isAuthenticating: isAuthenticating(loginState),
  };
};

const mapDispatchToProps = {
  login,
};

export const LoginMenu = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginMenuRaw);
