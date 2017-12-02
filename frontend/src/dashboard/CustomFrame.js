import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class CustomFrame extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
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

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
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
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            >

              <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
              <button onClick={this.closeModal}>close</button>
              <div>I am a modal</div>
            </Modal>
          </div>
        </div>
      )
    }
  };



  export default CustomFrame;
