import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

//edit forms
import TopAmersEditForm from '../widgets/TopAmers/TopAmersEditForm';
import WeatherEditForm from '../widgets/Weather/WeatherEditForm';
import TopAmePostsEditForm from '../widgets/TopAmePosts/TopAmePostsEditForm';
import PeopleOfADayEditForm from '../widgets/PeopleOfADay/PeopleOfADayEditForm';
import GifOfADayEditForm from '../widgets/GifOfADay/GifOfADayEditForm';
import UpcomingEventsEditForm from '../widgets/UpcomingEvents/UpcomingEventsEditForm';

class CustomFrame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false,
			widgetId: this.props.children.props.widgetId,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentWillMount() {
		Modal.setAppElement('#root');
	}

	editWidget = children => {
		console.log(children.type.name);
		return;
	};

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ ...this.state });
		this.setState({ modalIsOpen: false });
	}

	render() {
		const widgetTitle = this.props.title;
		let editForm = null;
		switch (widgetTitle) {
			case 'Top Ame Posts':
				editForm = <TopAmePostsEditForm widgetId={this.state.widgetId} />;
				break;
			case 'Top Amers':
				editForm = <TopAmersEditForm widgetId={this.state.widgetId} />;
				break;
			case 'Weather':
				editForm = <WeatherEditForm widgetId={this.state.widgetId} />;
				break;
			case 'People of the Day':
				editForm = <PeopleOfADayEditForm widgetId={this.state.widgetId} />;
				break;
			case 'Gif of a Day':
				editForm = <GifOfADayEditForm widgetId={this.state.widgetId} />;
				break;
			case 'Upcoming Events':
				editForm = <UpcomingEventsEditForm widgetId={this.state.widgetId} />;
				break;
			default:
		}
		return (
			<div>
				<div className="widget__outer custom-frame-container">
					<div className="title widget__edit">
						{this.props.editable && (
							<div>
								<a
									className="btn"
									onClick={() => {
										this.openModal();
									}}
								>
									Edit
								</a>
								<a
									className="btn"
									onClick={() => {
										this.props.onRemove();
									}}
								>
									Remove
								</a>
							</div>
						)}
					</div>
					<div className="custom-frame-content">{this.props.children}</div>
				</div>
				<div>
					<Modal
						isOpen={this.state.modalIsOpen}
						className="modal-dialog"
						//overlayClassName='edit_modal__overlay'
						onRequestClose={this.closeModal}
						contentLabel="Widget Editation"
					>
						<div className="modal-content">
							<div className="modal-header">
								<button
									type="button"
									className="close"
									onClick={this.closeModal}
								>
									<span aria-hidden="true">&times;</span>
									<span className="sr-only">Close</span>
								</button>
								<h3
									className="modal-title"
									ref={subtitle => (this.subtitle = subtitle)}
								>
									Widget Editation
								</h3>
							</div>

							<div className="modal-body">{editForm}</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-default"
									onClick={this.closeModal}
								>
									Close
								</button>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}

export default CustomFrame;
