import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { TopAmersEditForm } from '../widgets/TopAmers/TopAmersEditForm';

class CustomFrame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('#root');
  }

  editWidget = (children) => {
    console.log(children.type.name);
    return;
  };

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const widgetName = this.props.children.type.name;
    let editForm = null;
    switch (widgetName) {
      case 'TopAmePostsWidget':
      break;
      case 'TopAmersWidget':
      editForm = <TopAmersEditForm/>;
      break;
      case 'WeatherWidget':
      break;
      default:

    }
    return (
      <div>
        <div className="widget__outer custom-frame-container">
          <div className="title widget__edit">
            {this.props.editable &&
              <div>
                <a className="btn" onClick={() => {this.openModal();}} >Edit</a>
                <a className="btn" onClick={() => {this.props.onRemove();}} >Remove</a>
              </div>
            }
          </div>
          <div className="custom-frame-content">
            {this.props.children}
          </div>
        </div>
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            className='container'
            overlayClassName='edit_modal__overlay'
            onRequestClose={this.closeModal}
            contentLabel='Widget Editation'
            >
              <div className='edit_modal col-md-6'>
                <h3 ref={subtitle => this.subtitle = subtitle}>Widget Editation</h3>
                <div>{editForm}</div>
                <button onClick={this.closeModal}>Close</button>
              </div>
            </Modal>
          </div>
        </div>
      )
    }
  };



  export default CustomFrame;
