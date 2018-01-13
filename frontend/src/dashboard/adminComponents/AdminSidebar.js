import React, { Component } from 'react';
import picture from '../../img/amer.png';
import { Redirect, Link } from 'react-router-dom';

export class AdminSidebar extends Component {
    render() {
        return(
            <nav className="col-md-2 col-sm-3 admin-sidebar">
            
                <div className="admin-sidebar__user-info">
                    <div className="admin-sidebar__user-info--profile-pic">
                        <img src={picture} alt="Profile picture" />
                    </div>
                    <p>John Doe</p>
                </div>

                <div className="admin-sidebar__list">
                    <ul>
                        <li id="admin-sidebar__list--active"><a href="#">Dashboards</a></li>
                        <li><a href="#">Hello</a></li>
                    </ul>
                </div>

                <div className="admin-sidebar__other">
                    <ul>
                        <li><a href="#"><i className="fa fa-cog" aria-hidden="true"></i> Settings</a></li>
                        <li><a href="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
                    </ul>
                </div>

            </nav>
        )
    }
}