import React, { Component } from 'react';
import ReactDOM from "react-dom";
import api from '../../api.js';
import ReactLoginMS from "react-ms-login";
import { connectDashboardId } from '../../dashboardIdProvider';

var authHelper = require('./authHelper');
// var microsoftGraph = require("@microsoft/microsoft-graph-client");
let widgetType = "UpcomingEvents";
let widgetId = 5;
let dashboardId = 1;

class UpcomingEventsEditForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //channelIdValue: this.props.channelIdValue,
            email: "",
            password: "",
        };
    }

    componentDidMount() {
        
    }


    render() {
        return(
            <form>
                <div className="form-group">
                 <p>Please <a href={authHelper.getAuthUrl()}>sign in</a> with your Office 365 or Outlook.com account.</p>
                </div>
            </form>
        )
    }
}

export default connectDashboardId(UpcomingEventsEditForm);
