import React, { Component } from 'react';
import api from '../../api.js';

export class LoginMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      passInput: ""
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
    const {userInput, passInput} = this.state;
    // api.post('login', {username: userInput, password: passInput})
    // .then((res) => {
    //   console.log(res);
    // });

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
      console.log(res);
    });
  }

  render() {
    return(
      <form method="POST" name="login-form" className="menu-form" onSubmit={this.handleSubmit}>
        <div className="menu-form--index">
          <div className="menu-form--items">
            <label htmlFor="user">Username</label>
            <input type="text" id="user" onChange={this.handleChangeUser} value={this.state.userInput} tabIndex="1" />
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" onChange={this.handleChangePasswd} value={this.state.passInput} tabIndex="2"/>
          </div>
          <button className="login-button" type="submit" tabIndex="3">Login</button>
        </div>
      </form>
    )
  }
}
