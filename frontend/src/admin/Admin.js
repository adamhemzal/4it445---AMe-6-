/* import React, { Component } from 'react';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminMain } from './components/AdminMain';

export class Admin extends Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <AdminSidebar />
                    <AdminMain />
                </div>
            </div>
        )
    }
} */
import React, { Component, } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import CustomFrame from '../dashboard/CustomFrame';
import Modal from 'react-modal';
import Alert from 'react-s-alert';


import { WeatherWidget } from '../widgets/Weather/WeatherWidget';
import { TopAmersWidget } from '../widgets/TopAmers/TopAmersWidget';
import { TopAmePostsWidget } from '../widgets/TopAmePosts/TopAmePostsWidget';
import { PeopleOfADayWidget } from '../widgets/PeopleOfADay/PeopleOfADayWidget';
import { HamburgerMenu } from '../dashboard/menu/HamburgerMenu';
import { AdminEditForm } from '../admin/components/AdminEditForm';


// Dazzle
import EditBar from '../dashboard/EditBar';
import AddWidgetDialog from '../dashboard/AddWidgetDialog';
import MDSpinner from "react-md-spinner";
import api from '../api.js';

import logo from '../img/logo.png';

import 'react-dazzle/lib/style/style.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';


export class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      modalIsOpen: false,

      widgets: {
        TopAmePosts: {
          type: TopAmePostsWidget,
          title: 'Top Ame Posts'
        },
        TopAmers: {
          type: TopAmersWidget,
          title: 'Top Amers'
        },
        Weather: {
          type: WeatherWidget,
          title: 'Weather'
        }
      },

      editMode: false,
      isModalOpen: false,
      addWidgetOptions: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    api.get(`dashboard/layout/1`).then(response => {
      const { success, layout } = response.data;
      if (success) {
        this.setState({layout: layout, isLoading: false });
        // Pokud se nepovede ziskat layout z DB, pouzije se defaultni.
      } else {
        this.setState({
          layout: {
            rows: [{
              columns: [{
                className: 'col-md-4',
                widgets: [{ key: 'TopAmePosts' }],
              },{
                className: 'col-md-4',
                widgets: [{ key: 'TopAmers' }],
              },{
                className: 'col-md-4',
                widgets: [{ key: 'Weather' }],
              }],
            }]
          }
        })
      }
    }).catch(error => {
      console.log(error);
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  deleteDashboard = () => {

    Alert.info('Dashboard was deleted', {
        position: 'top-right',
        effect: 'slide',
        onShow: function () {
            console.log('aye!')
        },
        beep: false,
        timeout: 2500,
        offset: 100
    });

    this.closeModal();

  }

  onRemove = (layout) => {
    this.setState({
      layout,
    }, () => {
      this.saveLayout();
    });
  }

  onAdd = (layout, rowIndex, columnIndex) => {
    this.setState({
      isModalOpen: true,
      addWidgetOptions: {
        layout,
        rowIndex,
        columnIndex,
      },
    });
  }

  onMove = (layout) => {
    this.setState({
      layout,
    }, () => {
      this.saveLayout();
    });
  }

  onRequestClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  widgetSelected = (widgetName) => {
    const { layout, rowIndex, columnIndex } = this.state.addWidgetOptions;
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, widgetName),
    }, () => {
      this.saveLayout();
    });
    this.onRequestClose();
    ;
  }

  saveLayout = () => {
    api.post('dashboard/layout',
    {
      dashboardId: 1,
      layout: this.state.layout
    }
  ).then(response => {
    console.log(response);
  })
}


render() {
  return (
    <div>

      <header className="header clearfix">

        <div className="container-fluid flexbox">
          <div className="logo-outer">
            <img src={logo} alt="Logo AMe"/>
        </div>

        <div className="intro">
          <div className="intro__div">
            <h2 className="intro__title">Admin Workspace Dashboard</h2>
            <h3 className="intro__description">Simple description of this dashboard</h3>
          </div>

          <button className="btn btn-default intro__button" onClick={() => {this.openModal();}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
        </div>

          <HamburgerMenu />

        </div>

      </header>

      <div className="container">

        <div className="">

          <EditBar onEdit={this.toggleEdit} />
          <Dashboard
            onRemove={this.onRemove}
            layout={this.state.layout}
            widgets={this.state.widgets}
            editable={this.state.editMode}
            addWidgetComponentText="Add"
            onAdd={this.onAdd}
            onMove={this.onMove}
            frameComponent={CustomFrame}
          />

            <AddWidgetDialog
              widgets={this.state.widgets}
              isModalOpen={this.state.isModalOpen}
              onRequestClose={this.onRequestClose}
              onWidgetSelect={this.widgetSelected}
            />

            <Alert stack={{limit: 3}} />

            <Modal
              isOpen={this.state.modalIsOpen}
              className='modal-dialog'
              //overlayClassName='edit_modal__overlay'
              onRequestClose={this.closeModal}
              contentLabel='Widget Editation'
              >
                <div className='modal-content'>

                  <div className="modal-header">
                    <button type="button" className="close" onClick={this.closeModal}>
                      <span aria-hidden="true">&times;</span>
                      <span className="sr-only">Close</span>
                    </button>
                    <h3 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Dashboard Options</h3>
                  </div>

                  <div className="modal-body"><AdminEditForm /></div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-default btn-delete float--left" onClick={this.deleteDashboard}>Delete Dashboard</button>
                    <button type="button" className="btn btn-default float--right" onClick={this.closeModal}>Close</button>
                  </div>

                </div>
              </Modal>

          </div>

          <hr/>

          <footer>
            <p>&copy; AMe 2017</p>
          </footer>

        </div>

      </div>
    )
  }
}
