import React, { Component } from 'react';
import api from '../../api.js';
let widgetType = "UpcomingEvents";
let widgetId = 5;
let dashboardId = 1;

export class UpcomingEventsEditForm extends Component {
    render() {
        return(
            <form>
                <div className="form-group">
                    <label for="channelId">Channel ID</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="channelId" 
                        onChange 
                        value 
                        placeholder="Enter channel ID">
                    </input>
                    <button className="btn">Test</button>
                </div>
            </form>
        )
    }
}