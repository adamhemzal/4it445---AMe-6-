import React, { Component } from 'react';
import api from '../../api.js';
let widgetType = "TopAmePosts";
let widgetId = 3;
let dashboardId = 1;

export class TopAmePostsEditForm extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            channelIdValue: this.props.channelIdValue,
            resultText:""
        };
    }

    render() {
        return(
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label for="channelId">Channel ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="channelId" 
                            onChange={this.handleChange} 
                            value={this.state.channelIdValue} 
                            placeholder="Enter channel ID">
                        </input>
                        <button className="btn" onClick={this.submit}>Uložit</button>
                                <div className="edit-result">{this.state.resultText}</div>
                    </div>
                </form>
                );
    }

    handleChange(event) {
        this.setState({channelIdValue: event.target.value});
    }

    submit(event) {
        event.preventDefault();
        
        let settings = {channel:this.state.channelIdValue};
        let data = {
            "widgetType":widgetType,
            "widgetId":widgetId,
            "dashboardId":dashboardId,
            "settings":settings
        };
        
        
        api.post('top-ame-posts', data)
                .then(response => {
                    console.log(response);
                    this.setState({resultText:"Uloženo"});
                })
                .catch(error => {
                    console.log(error);
                });
    }
}
;
