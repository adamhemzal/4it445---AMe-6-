import React, { Component } from 'react';

export class HamburgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.toggleId = this.toggleId.bind(this);
    }

    toggleId() {
        const currentState = this.state.active;
        this.setState({
            active: !currentState
        });
    }
    
    render() {
        return(
            <div>
                <div className="menu" onClick={this.toggleId}>
                    <span></span>
                    <span></span>   
                    <span></span>
                </div>

                <div className="menu-hamburger" id={this.state.active ? 'visible' : null} >
                    <div className="menu-hamburger__close" onClick={this.toggleId}>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        <li><a href="" className="login-button">Login</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}