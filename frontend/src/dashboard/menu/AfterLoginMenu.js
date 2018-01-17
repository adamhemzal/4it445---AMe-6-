import React, { Component } from 'react';
import api from '../../api.js';
import Alert from 'react-s-alert';

export class AfterLoginMenu extends Component {
	constructor() {
		super();
		this.state = { dashboardList: [] };
	}

	componentDidMount() {
		let dashboardList = api
			.get('dashboard/list')
			.then(response => {
				console.log(response);
				this.setState({ dashboardList: response.data.list });
			})
			.catch(error => {
				console.log(error);
			});
	}

	deleteDashboard = (id) => {
		console.log(id);

		let dashboardId = id;

		api.delete(`dashboard/delete/${dashboardId}`).then(response => {
			console.log(response);

			Alert.error('Dashboard was deleted', {
				position: 'top-right',
				effect: 'slide',
				onShow: function() {
					console.log('aye!');
				},
				beep: false,
				timeout: 2500,
				offset: 100,
			});

			//this.closeModal();

			setTimeout(function() {
				//this.props.history.push('/dashboard/' + response.data.newId);
				window.location.replace('/dashboard/' + response.data.newId);
			}, 1500)
		});
	};

	render() {
		return (
			<div className="col-md-12">
				<div className="admin-main">
					<div className="admin-main__items">
						<ul>
							{this.state.dashboardList.map((dashboard, index) => (
								<li key={dashboard.id}>
									<a href={'/dashboard/' + dashboard.id}>{dashboard.name}</a>
									<a className='delete-button' href="#" onClick={() => { if (window.confirm('Are you sure you wish to delete dashboard #' + dashboard.id + '?')) this.deleteDashboard(dashboard.id) } } ><i className="fa fa-remove"></i></a>
								</li>
							))}
						</ul>

					</div>
				</div>
			</div>
		);
	}
}
