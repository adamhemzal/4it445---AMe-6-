import React, { Component } from 'react';
import api from '../../api.js';

import { connectDashboardId } from '../../dashboardIdProvider';

import MDSpinner from 'react-md-spinner';

class PeopleOfADayWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			isLoading: true,
			widgetId: this.props.widgetId,
			dashboardId: this.props.dashboardId,
			isWidgetSetUp: false,
			description: '',
		};
	}

	componentDidMount() {
		api('person-day', { params: { dashboardId: this.state.dashboardId, widgetId: this.state.widgetId } })
			.then(response => {

				const { user, description } = response.data.settings;
				const { success } = response.data;

				if (!success) {
					this.setState({ isLoading: false });
				} else {
					this.setState({ userData: user, description: description, isLoading: false, isWidgetSetUp: true });
				}

			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { userData, isLoading, isWidgetSetUp } = this.state;

		let widgetMessage = '';
		if ((!userData || isWidgetSetUp) && !isLoading) {
			widgetMessage = 'No person to display';
		} else if (!isWidgetSetUp && !isLoading) {
			widgetMessage = 'Please set the person first';
		}

		return (
			<div className="widget top_amers">
				<div className="widget__inner widget__inner--dark">
					<div className="widget__header clearfix">
						<h2 className="widget__name">People of the Day</h2>
					</div>

					<div className="widget__content">

						{isLoading ? <MDSpinner className="md-spinner" /> : null}

						<ul className="top_amers__list">

							{(!userData || !isWidgetSetUp) && !isLoading ? (
								<p className="no_data">{widgetMessage}</p>
							) : (

							<li className="top_amers__list-item">
								<div className="top_amers__image">
									<img src={userData.image} alt={userData.real_name} />
									<span className="top_amers__badge">{userData.real_name}</span>
								</div>

								<div className="top_amers__content clearfix">
									<h5 className="top_amers__value text-center">
										{this.state.description}
									</h5>
								</div>
							</li>

						)}

						</ul>
					</div>

				</div>
			</div>
		);
	}
}

export default connectDashboardId(PeopleOfADayWidget);
