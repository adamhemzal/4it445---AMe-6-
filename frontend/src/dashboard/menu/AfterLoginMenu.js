import React, { Component } from 'react';
import api from '../../api.js';


export class AfterLoginMenu extends Component {

    constructor() {
        super();
        this.state = {dashboardList: []};
    }

    componentDidMount() {
        let dashboardList = api.get('dashboard/list').then(response => {
            console.log(response);
            this.setState({dashboardList: response.data.list});
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return(
                <div className="col-md-12">
                    <div className="admin-main">
                        <div className="admin-main__items">
                            <ul>
                                {this.state.dashboardList.map((dashboard, index) =>
                                    <li key={dashboard.id}><a href={"/dashboard/" + dashboard.id}><p>{dashboard.name}</p></a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                );
    }
}
