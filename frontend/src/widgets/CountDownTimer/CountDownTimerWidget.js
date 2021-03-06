import React, { Component } from 'react';
import api from '../../api.js';
import MDSpinner from 'react-md-spinner';

import { connectDashboardId } from '../../dashboardIdProvider';

class CountDownTimerWidget extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			timer: {},
			event: [],
			stateEventDate: 0,
			isLoading: true,
			stateCurrentTime: 0,
			dashboardId: this.props.dashboardId,
		};
		this.countDownTime = 0;
	}

	componentDidMount() {
		//Tohle příjde nahradit za API

		api
			.get('outlook')
			.then(response => {

				this.setState({ event: response.data[0], isLoading: false });

				let eventDate = Date.parse(this.state.event.date);
				let current = new Date();

				if(eventDate < current) {
						this.setState({ event: response.data[1] });
						eventDate = Date.parse(this.state.event.date);
				}

				this.setState({ stateEventDate: eventDate });
			})
			.catch(error => {
				console.log(error);
				this.setState({ isLoading: false });
			});

		//const eventDate = new Date(this.state.events[0].start);
		//const eventDate = new Date("April 5, 2018 18:25:00").getTime();

		this.countDownTime = setInterval(
			() => this.countingTime(this.state.stateEventDate),
			1000,
		);
	}

	componentWillUnmount() {
		clearInterval(this.countDownTime);
	}

	countingTime(date) {
		const currentTime = new Date().getTime();
		const distance = date - currentTime;

		const countDays = Math.floor(distance / (1000 * 60 * 60 * 24));
		const countHours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		);
		const countMinutes = Math.floor(
			(distance % (1000 * 60 * 60)) / (1000 * 60),
		);
		//const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		//pro testování sekund
		//console.log("SEKUNDY", seconds);

		let timeObject = {
			day: countDays,
			hours: countHours,
			minutes: countMinutes,
			//seconds : seconds,
		};

		this.setState({
			timer: timeObject,
		});
	}

	render() {
		return (
			<div className="widget">
				<div className="widget__inner">
					<div className="widget__header widget__inner--dark clearfix">
						<h2 className="widget__name">
							Count Down Timer to the nearest event
						</h2>
					</div>

					<div className="container widget__content">

						{this.state.isLoading ? <MDSpinner className="md-spinner" /> : null}

						{!this.state.event && !this.state.isLoading ? (
							<p className="no_data">No events are planned</p>
						) : (
							<div style={this.state.isLoading ? { display: 'none', } : { display: 'block', } }>
								<div className="row timer__flex-center" >
									<div className="col-sm-3 timer__center">
										<div className="timer__block">
											<p>
												{this.state.timer.day === ''
													? '0'
													: this.state.timer.day}
											</p>
										</div>
										<p className="timer__block-date">days</p>
									</div>

									<div className="col-sm-3 timer__center">
										<div className="timer__block">
											<p>
												{this.state.timer.hours === ''
													? '0'
													: this.state.timer.hours}
											</p>
										</div>
										<p className="timer__block-date">hours</p>
									</div>

									<div className="col-sm-3 timer__center">
										<div className="timer__block">
											<p>
												{this.state.timer.minutes === ''
													? '0'
													: this.state.timer.minutes}
											</p>
										</div>
										<p className="timer__block-date">minutes</p>
									</div>
								</div>

								{/* <div className="row timer__padding-both">
									<div className="col-md-12 timer__flex">
										<p className="timer__to">to</p>
									</div>
								</div> */}

								<div className="divider"></div>

								<div className="row timer__padding-both timer__padding-bottom">
									<div className="col-md-12 timer__flex">
										<p className="timer__event-name">
											<i className="fa fa-calendar"></i> {this.state.event.summary}
										</p>
									</div>
								</div>
							</div>

						)}

					</div>
				</div>
			</div>
		);
	}
}

export default connectDashboardId(CountDownTimerWidget);
