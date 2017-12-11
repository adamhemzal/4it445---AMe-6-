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
        this.selectChange = this.selectChange.bind(this);

        this.state = {
            //channelIdValue: this.props.channelIdValue,
            channelIdValue: "",
            resultText: "",
            slackChannels: [],
        };
    }

    componentDidMount() {
        const availableChannels = this.getAvailableChannels();
    }

    getAvailableChannels() {
        api.get('slack-channels')
                .then(response => {
                    console.log(response);
                    this.setState({slackChannels: response.data});
                })
                .catch(error => {
                    console.log(error);
                });
    }

    selectChange(event) {
        this.setState({channelIdValue: event.target.value});
    }

    render() {
        return(
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <select onChange={this.selectChange}>
                            <option value="" disabled="disabled" selected="selected">Please select a channel</option>
                            {this.state.slackChannels.map((channel, index) =>
                                        <option value={channel.id}>{channel.name}</option>
                                        )}      
                                
                        </select>
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
                    this.setState({resultText: "Successfuly saved"});
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
    }
}
;
