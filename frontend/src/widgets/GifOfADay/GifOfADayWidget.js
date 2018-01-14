import React, { Component } from 'react';
import api from '../../api.js';
import axios from 'axios';
import { connectDashboardId } from '../../dashboardIdProvider';

class GifOfADayWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gifs: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getGifs();
	}

	getGifs() {
		const apiKeyGif = 'IJIIICknvqTbL8pdk93Kq0WeYOv9HHa6';

		axios
			.get(
				'http://api.giphy.com/v1/gifs/trending?&api_key=' +
					apiKeyGif +
					'&limit=1',
			)
			.then(res => {
				const data = res.data.data[0].images.downsized_large;
				console.log('GIF', data);
				this.setState({
					gifs: data,
					isLoading: false,
				});
			});
	}

	render() {
		return (
			<div className="widget gif">
				<div className="widget__inner">
					<div className="widget__header clearfix">
						<h2 className="widget__name">Gif of a Day</h2>
					</div>
					<div className="widget__content">
						<img
							src={`${this.state.gifs.url}`}
							alt="Gif of a Day"
							className="gif__image"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default connectDashboardId(GifOfADayWidget);
