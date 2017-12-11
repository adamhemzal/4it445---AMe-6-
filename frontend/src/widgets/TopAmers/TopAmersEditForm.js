import React, { Component } from 'react';
import api from '../../api.js';
let widgetType = "TopAmers";
let widgetId = 2;
let dashboardId = 1;

export class TopAmersEditForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setChannel = this.setChannel.bind(this);

        this.state = {
            //channelIdValue: this.props.channelIdValue,
            channelIdValue: "",
            resultText: "",
            wasChanged:false
        };
    }

    render() {
        return(
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label for="channelId">Enter channel ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="channelId" 
                            onChange={this.handleChange} 
                            value={this.state.channelIdValue} 
                            placeholder="Enter channel ID">
                        </input>
                        <label>or choose from the most favorie ones:</label>
                        <div className="predefined-channels">
                            <button type="button" className="btn btn-sm" onClick={() => this.setChannel("C0BUA20S0") } >#general</button>
                            <button type="button" className="btn btn-sm" onClick={() => this.setChannel("C7693MGNS") } >#tym6-ame</button>
                            <button type="button" className="btn btn-sm" onClick={() => this.setChannel("C0BUA262F") } >#random</button>
                        </div>
                        <hr/>
                        <button className="btn" onClick={this.submit}>Save</button>
                        <h2>{this.state.resultText}</h2>
                    </div>
                </form>
                );
    }

    handleChange(event) {
        this.setState({channelIdValue: event.target.value});
    }

    setChannel(id) {
        this.setState({channelIdValue: id});
    }

    submit(event) {
        event.preventDefault();

        let settings = {channel: this.state.channelIdValue};
        let data = {
            "widgetType": widgetType,
            "widgetId": widgetId,
            "dashboardId": dashboardId,
            "settings": settings
        };


        api.post('top-amers', data)
                .then(response => {
                    console.log(response);
                    this.setState({resultText: "Successfuly saved", wasChanged:true});
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
    }
}
;
