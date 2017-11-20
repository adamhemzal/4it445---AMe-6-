import React, { Component } from 'react';

export class AdminMain extends Component {
    render() {
        return(
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
        )
    }
}