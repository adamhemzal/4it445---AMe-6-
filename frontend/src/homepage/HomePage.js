import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {
	render() {
		return (
			<Link className="login-button first-button" to="/dashboard/1">
				Open dashboard
			</Link>
		);
	}
}
