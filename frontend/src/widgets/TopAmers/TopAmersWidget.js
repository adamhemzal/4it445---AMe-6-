import React, { Component } from 'react';
import AMer from '../../img/amer.png';
import Slider from 'react-slick';
import api from '../../api.js';

import { connectDashboardId } from '../../dashboardIdProvider';

import MDSpinner from 'react-md-spinner';

class TopAmersWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topAmers: [],
			isWidgetSetUp: false,
			isLoading: true,
			dashboardId: this.props.dashboardId,
			widgetId: this.props.widgetId,
		};
	}

	componentDidMount() {
		api('top-amers', {
			params: {
				dashboardId: this.state.dashboardId,
				widgetId: this.state.widgetId,
			},
		})
			.then(response => {
				const { topAmers, success } = response.data;
				if (!success) {
					this.setState({ isLoading: false });
				} else {
					this.setState({ topAmers, isLoading: false, isWidgetSetUp: true });
				}
				console.log('AMERS', topAmers);
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { topAmers, isWidgetSetUp, isLoading } = this.state;

		const settings = {
			customPaging: i => {
				return (
					<div className="top_amers__navigation-item col">
						<div className="top_amers__navigation-item-inner">
							<img src={topAmers[i].image} />
						</div>
					</div>
				);
			},
			dots: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			dotsClass: 'top_amers__navigation',
			arrows: false,
		};

		let widgetMessage = '';
		if (topAmers.length === 0 && isWidgetSetUp && !isLoading) {
			widgetMessage = 'No AMers to display';
		} else if (!isWidgetSetUp && !isLoading) {
			widgetMessage = 'Please set the channel first';
		}

		return (
			<div className="widget top_amers">
				<div className="widget__inner widget__inner--dark">
					<div className="widget__header clearfix">
						<h2 className="widget__name">Top AMers (last week)</h2>
					</div>

					<div className="widget__content">
						{isLoading ? <MDSpinner className="md-spinner" /> : null}

						<ul className="top_amers__list">
							{(topAmers.length === 0 || !isWidgetSetUp) && !isLoading ? (
								<p className="no_data">{widgetMessage}</p>
							) : (
								<Slider {...settings}>
									{topAmers.map((topAmer, index) => (
										<li key={index} className="top_amers__list-item">
											<div className="top_amers__image">
												<img
													src={topAmer.image}
													alt={topAmer.realName}
													className="gif__image"
												/>
												<span className="top_amers__badge">
													{topAmer.ameCount}x{' '}
													<img
														src={require('../../img/ame-small.png')}
														alt={topAmer.realName}
													/>
												</span>
											</div>
											<div className="top_amers__content clearfix">
												<h3 className="top_amers__name float--left">
													{topAmer.realName}
												</h3>
												<h5 className="top_amers__value float--right">
													<span className="small-text">rank</span> {index + 1}.
												</h5>
											</div>
										</li>
									))}
								</Slider>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default connectDashboardId(TopAmersWidget);
