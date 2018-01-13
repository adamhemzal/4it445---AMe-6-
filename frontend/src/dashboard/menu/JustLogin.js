import React, { Component } from 'react';
import LoginMenu from './LoginMenu';

export class JustLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            dashboardId: this.props.dashboardId,
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
                <div className="just-login">
                    <button className="login-button" onClick={this.toggleId} >Log in</button>
                </div>

                <div className="menu-hamburger" id={isActive()} >
                    <div className="menu-hamburger__header">
                        <div className="menu-hamburger__close" onClick={this.toggleId}>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <LoginMenu dashboardId={this.state.dashboardId} />
                </div>
            </div>
        )
    }
}
