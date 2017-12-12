import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import api from '../../api.js';
let widgetType = "TopAmePosts";
let widgetId = 3;
let dashboardId = 1;

export class TopAmePostsEditForm extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setChannel = this.setChannel.bind(this);
        this.selectChange = this.selectChange.bind(this);

        this.state = {
            //channelIdValue: this.props.channelIdValue,
            channelIdValue: "C0BUA20S0",
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

    selectChange(event){
        this.setState({channelIdValue: event.target.value});
    }

    render() {
        return(
                <form onSubmit={this.submit}>
                    <div className="form-group">

                      <Select
                        name="form-field-name"
                        value={this.state.channelIdValue}
                        onChange={this.handleChange}
                        options={this.state.slackChannels}
                        valueKey="id"
                        labelKey="name"
                      />

                        {/* <select onChange={this.selectChange}>
                            <option value="" disabled="disabled" selected="selected">Please select a channel</option>
                            {this.state.slackChannels.map((channel, index) =>
                                        <option value={channel.id}>{channel.name}</option>
                                        )}

                        </select> */}
                        <button className="btn btn-default btn-save float--left" onClick={this.submit}>Save</button>
                        <h2>{this.state.resultText}</h2>
                    </div>
                </form>
                );
    }

    handleChange(newValue) {
        this.setState({ channelIdValue: newValue });
        console.log(newValue);
    }

    setChannel(id) {
        this.setState({channelIdValue: id});
    }

    submit(event) {
        event.preventDefault();

        let settings = {channel: this.state.channelIdValue.id};
        let data = {
            "widgetType": widgetType,
            "widgetId": widgetId,
            "dashboardId": dashboardId,
            "settings": settings
        };


        api.post('top-ame-posts', data)
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
