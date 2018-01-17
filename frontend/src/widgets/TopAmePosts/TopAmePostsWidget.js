import React, { Component } from 'react';
import api from '../../api.js';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import MDSpinner from 'react-md-spinner';
import { connectDashboardId } from '../../dashboardIdProvider';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

class TopAmePostsWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topAmePosts: [],
			isLoading: true,
			dashboardId: this.props.dashboardId,
			widgetId: this.props.widgetId,
		};
	}

	componentDidMount() {
		api('top-ame-posts', {
			params: {
				dashboardId: this.state.dashboardId,
				widgetId: this.state.widgetId,
			},
		})
			.then(response => {
				console.log('Top Ame Posts', response);
				const topAmePosts = response.data.topAmePosts;
				const channel = response.data.channel;
				this.setState({
					topAmePosts: topAmePosts,
					channel: channel,
					isLoading: false,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { topAmePosts, isLoading } = this.state;

		return (
			<div className="widget top_posts">
				<div className="widget__inner">
					<div className="widget__header clearfix">
						<h2 className="float--left widget__name">Top AMe Posts</h2>
						<h3 className="float--right">
							4IT445 <span>#{this.state.channel}</span>
						</h3>
					</div>

					<div className="widget__content widget__content--padding">
						{this.state.isLoading ? <MDSpinner className="md-spinner" /> : null}

						{topAmePosts.length === 0 && !this.state.isLoading ? (
							<p className="no_data">No AMe posts to display</p>
						) : (
							<ul className="top_posts__list">
								{topAmePosts.map((topAmePost, index) => (
									<TopAmePost key={index} data={topAmePost} />
								))}
							</ul>
						)}
					</div>

					<div className="widget__footer text-center">
						<a
							className="btn btn--link"
							target="_"
							href={'https://4it445.slack.com/messages/' + this.state.channel}
							role="button"
						>
							See All
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default connectDashboardId(TopAmePostsWidget);

class TopAmePost extends Component {
	render() {
		return (
			<li className="top_posts__list-item">
				<h3 className="top_posts_post-title">
					<a
						target="_"
						className="top_posts_post-link"
						href={this.props.data.link}
					>
						<ResponsiveEllipsis
							text={this.props.data.text}
							maxLine="3"
							ellipsis="..."
							trimRight
							basedOn="letters"
						/>
					</a>
				</h3>
				<div className="clearfix">
					<h4 className="top_posts__name">
						<a target="_" href={this.props.data.userLink}>
							{this.props.data.realName}
						</a>
					</h4>
					<h5 className="top_posts__likes">
						{this.props.data.ameCount}x{' '}
						<img src={require('../../img/ame-small.png')} alt="" />
					</h5>
				</div>
			</li>
		);
	}
}
