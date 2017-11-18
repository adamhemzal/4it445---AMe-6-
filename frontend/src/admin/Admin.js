import React, { Component } from 'react';
import picture from '../img/amer.png';

export class Admin extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
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

                    <div className="col-md-10 col-sm-9">
                        <div className="row">

                            <div className="col-md-12 zero-padding">
                                <div className="admin-header">
                                    <h1>Dashboards</h1>
                                    <button className="admin-header--button"><i className="fa fa-plus-circle" aria-hidden="true"></i> Add new dashboard</button>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="admin-main">
                                    
                                    <div className="admin-main__items">
                                        <ul>
                                            <li>
                                                <p>Dashboard 1</p>
                                                <div>
                                                    <button className="admin-main--button admin-main--button-edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                                                    <button className="admin-main--button admin-main--button-delete"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                                                </div>
                                            </li>

                                            <li>
                                                <p>Dashboard 1</p>
                                                <div>
                                                    <button className="admin-main--button admin-main--button-edit"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                                                    <button className="admin-main--button admin-main--button-delete"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                    
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}