import React, { Component } from 'react';
import { connectDashboardId } from '../../dashboardIdProvider';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import api from '../../api.js';

let widgetType = 'TopAmePosts';
let widgetId = 8;

class PeopleOfADayEditForm extends Component {

	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setUser = this.setUser.bind(this);
		this.selectChange = this.selectChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);


		this.state = {
			userIdValue: 'C0BUA20S0',
			resultText: '',
			widgetId: this.props.widgetId,
			dashboardId: this.props.dashboardId,
			slackUsers: [],
			description: '',
			userDescription: ''
		};
	}

	componentDidMount() {
		 const availableUsers = this.getAvailableUsers();
		 const currentUser = this.getWidgetSettings();

		 console.log(currentUser);
	}

	getAvailableUsers() {
		api
			.get('slack-users/list')
			.then(response => {
				console.log("users: " + response);
				this.setState({ slackUsers: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	getWidgetSettings() {
		api('person-day', {
			params: {
				dashboardId: this.state.dashboardId,
				widgetId: this.state.widgetId,
			},
		})
			.then(response => {
				console.log(response);
				this.setState({ userIdValue: response.data.settings.user, description: response.data.settings.description });
			})
			.catch(error => {
				console.log(error);
			});
	}

	selectChange(event) {
		this.setState({ userIdValue: event.target.value });
	}

	handleChange(newValue) {
		this.setState({ userIdValue: newValue });
		console.log(newValue);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	setUser(id) {
		this.setState({ userIdValue: id });
	}

	submit(event) {
		event.preventDefault();

		let dashboardId = this.props.dashboardId;

		//this.setState(userIdValue: 'C0BUA20S0');

		let settings = { user: this.state.userIdValue, description: this.state.description };
		let data = {
			widgetType: widgetType,
			widgetId: widgetId,
			dashboardId: dashboardId,
			settings: settings,
		};

		api
			.post('person-day', data)
			.then(response => {
				console.log(response);
				this.setState({ resultText: 'Successfuly saved' });
				window.location.reload();
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<form>

				<div className="form-group">

					<label>Person of the day</label>

					<Select
						name="form-field-name"
						value={this.state.userIdValue}
						onChange={this.handleChange}
						options={this.state.slackUsers}
						valueKey="id"
						labelKey="real_name"
					/>

					<label htmlFor="userDescription">User description</label>
					<textarea
						onChange={this.handleInputChange}
						type="text"
						name="description"
						className="form-control"
						id="userDescription"
						value={this.state.description}
						aria-describedby="userDescription"
						placeholder="Enter user description message"
						required
						rows="4"
					/>

					<button
						className="btn btn-default btn-save float--left"
						onClick={this.submit}
					>
						Save
					</button>

				</div>


			</form>
		);
	}
}

export default connectDashboardId(PeopleOfADayEditForm);
