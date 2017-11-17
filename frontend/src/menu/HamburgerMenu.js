import React, { Component } from 'react';

export class HamburgerMenu extends Component {
    render() {
        return(
            <div>
                <div className="menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="menu-hamburger" onClick={this.props.onClick}>
                    <ul>
                        <li><a href="">Login</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}