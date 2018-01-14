import React, { Component } from 'react';
import { AfterLoginMenu } from './AfterLoginMenu';

export class HamburgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.toggleId = this.toggleId.bind(this);
        this.setHamburgerMenuOpen = this.props.setHamburgerMenuOpen;

    }

    toggleId() {
        const newState = !this.state.active;
        this.setState({
            active: newState
        });
        this.setHamburgerMenuOpen(newState);
    }
    
    render(props) {

        const isActive = () => {
            if (this.state.active === true) {
                document.getElementsByTagName("body")[0].style.overflow="hidden";
                return 'visible';
            } else {
                document.getElementsByTagName("body")[0].style.overflow="visible";
                return null;
            }
        }

        return(
            <div>
                <div className="menu" onClick={this.toggleId}>
                    <span></span>
                    <span></span>   
                    <span></span>
                </div>

                <div className="menu-hamburger" id={isActive()} >
                <div className="menu-hamburger__header">
                    <div className="menu-hamburger__add">
                        <button onClick={this.props.openModal} className="login-button"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add new dashboard</button>
                    </div>
                    <div className="menu-hamburger__logout">
                        <button className="logout-button">Log out</button>
                    </div>
                    <div className="menu-hamburger__close" onClick={this.toggleId}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                    <AfterLoginMenu />
                </div>
            </div>
        )
    }
}