import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import api from '../../api.js';
import { connectDashboardId } from '../../dashboardIdProvider';
import getDisplayName from 'recompose/getDisplayName';

let widgetType = 'TopAmers';
let widgetId = 2;
let dashboardId = 1;

class TopAmersEditForm extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setChannel = this.setChannel.bind(this);
		this.selectChange = this.selectChange.bind(this);

		this.state = {
			//channelIdValue: this.props.channelIdValue,
			channelIdValue: 'C0BUA20S0',
			resultText: '',
			slackChannels: [],
		};
	}

	componentDidMount() {
		const availableChannels = this.getAvailableChannels();
	}

	getAvailableChannels() {
		api
			.get('slack-channels')
			.then(response => {
				console.log(response);
				this.setState({ slackChannels: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	selectChange(event) {
		this.setState({ channelIdValue: event.target.value });
	}

	render() {
		return (
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

					<button
						className="btn btn-default btn-save float--left"
						onClick={this.submit}
					>
						Save
					</button>
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
		this.setState({ channelIdValue: id });
	}

	submit(event) {
		event.preventDefault();

		let settings = { channel: this.state.channelIdValue.id };
		let data = {
			widgetType: widgetType,
			widgetId: widgetId,
			dashboardId: dashboardId,
			settings: settings,
		};

		console.log(settings);

		api
			.post('top-amers', data)
			.then(response => {
				console.log(response);
				this.setState({ resultText: 'Successfuly saved' });
				window.location.reload();
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default connectDashboardId(TopAmersEditForm);
