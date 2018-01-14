import React, { Component } from 'react';
import api from '../../api.js';
import { connectDashboardId } from '../../dashboardIdProvider';
let widgetType = "GifOfADay";
let widgetId = 4;
let dashboardId = 1;

class GifOfADayEditForm extends Component {
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
                    <button className="btn">Zkouška</button>
                </div>
            </form>
        )
    }
}

export default connectDashboardId(GifOfADayEditForm);
