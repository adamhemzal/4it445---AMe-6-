import React, { Component } from 'react';

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
        
    }

    render() {
        return(
            <form method="POST" name="login-form" className="menu-form" onSumbit={this.handleSubmit}>
                <div className="menu-form--index">
                    <div className="menu-form--items">
                        <label for="user">Username</label>
                        <input type="text" id="user" onChange={this.handleChangeUser} value={this.state.userInput} tabindex="1" />
                        <label for="pass">Password</label>
                        <input type="password" id="pass" onChange={this.handleChangePasswd} value={this.state.passInput} tabindex="2"/>
                    </div>
                    <button className="login-button" type="submit" form="login-form" tabindex="3">Login</button>
                </div>
            </form>
        )
    }
}