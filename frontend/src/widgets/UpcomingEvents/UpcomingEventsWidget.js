import React, { Component } from 'react';
import api from '../../api.js';
import MDSpinner from 'react-md-spinner';
import { connectDashboardId } from '../../dashboardIdProvider';

let widgetType = 'UpcomingEvents';
let widgetId = 6;

class UpcomingEventsWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			isLoading: true,
			numberOfEvents: 4,
		};
	}

	componentDidMount() {
		api
			.get('outlook')
			.then(response => {
				console.log(response);
				this.setState({ events: response.data, isLoading: false });
			})
			.catch(error => {
				console.log(error);
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { events, isLoading } = this.state;

		return (
			<div className="widget">
				<div className="widget__inner">
					<div className="widget__header clearfix">
						<h2 className="widget__name">Upcoming Events</h2>
					</div>
					<div className="widget__content widget__content--padding event__padding-bottom">
						{this.state.isLoading ? <MDSpinner className="md-spinner" /> : null}

						{events.length === 0 && !this.state.isLoading ? (
							<p className="no_data">No events are planned</p>
						) : (
							<div className="events">
								{events
									.slice(0, this.state.numberOfEvents)
									.map((event, index) => (
												<div className="event" key={index}>
													<div className="event__name">{event.summary}</div>

													<p className="event__info">
														<i className="fa fa-clock-o" aria-hidden="true" />
														{event.start} <span className="spacer"></span>

														<i className="fa fa-map-marker" aria-hidden="true" />
														{event.location}
													</p>
													
													{ /*
																		<div className="col-md-12">
																				<p className="event__info"><i className="fa fa-map-marker" aria-hidden="true"></i>Kozlovna</p>
																		</div> */ }

												</div>

									))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default connectDashboardId(UpcomingEventsWidget);
