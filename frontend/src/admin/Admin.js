import React, { Component } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminMain } from './components/AdminMain';

export class Admin extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <AdminSidebar />
                    <AdminMain />
                </div>
            </div>
        )
    }
}