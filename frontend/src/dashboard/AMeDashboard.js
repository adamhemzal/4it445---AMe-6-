import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import CustomFrame from './CustomFrame';
import Modal from 'react-modal';
import Alert from 'react-s-alert';

import { connect } from 'react-redux';

import WeatherWidget from '../widgets/Weather/WeatherWidget';
import TopAmersWidget from '../widgets/TopAmers/TopAmersWidget';
import TopAmePostsWidget from '../widgets/TopAmePosts/TopAmePostsWidget';
import PeopleOfADayWidget from '../widgets/PeopleOfADay/PeopleOfADayWidget';
import GifOfADayWidget from '../widgets/GifOfADay/GifOfADayWidget';
import CountDownTimerWidget from '../widgets/CountDownTimer/CountDownTimerWidget';
import UpcomingEventsWidget from '../widgets/UpcomingEvents/UpcomingEventsWidget';

import HamburgerMenu from './menu/HamburgerMenu';
import { AdminEditForm } from './adminComponents/AdminEditForm';
import { JustLogin } from './menu/JustLogin';
import { DashboardIdProvider } from '../dashboardIdProvider';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import {
  getLoginState,
  getUser,
  isAuthenticated,
} from './menu/reducer';

// Dazzle
import EditBar from './EditBar';
import AddWidgetDialog from './AddWidgetDialog';
import MDSpinner from "react-md-spinner";
import api from '../api.js';

import logo from '../img/logo.png';

import 'react-dazzle/lib/style/style.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

//import { Admin } from '../admin/Admin';

class AMeDashboard extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      modalIsOpen: false,
      name: 'Admin Workspace Dashboard',
      description: 'Simple description of this dashboard',

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
        },
        PeopleOfADay: {
          type: PeopleOfADayWidget,
          title: 'People of the Day'
        },
        GifOfADay: {
          type: GifOfADayWidget,
          title: 'Gif of a Day',
        },
        CountDownTimer: {
          type: CountDownTimerWidget,
          title: 'Count Down Timer',
        },
        UpcomingEvents: {
          type: UpcomingEventsWidget,
          title: 'Upcoming Events',
        },
      },

      editMode: false,
      isModalOpen: false,
      addWidgetOptions: null,
      isHamburgerMenuOpen: false,
      dashboardId: props.match.params.dashboardId,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setHamburgerMenuOpen = this.setHamburgerMenuOpen.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    api.get(`dashboard/info/${this.state.dashboardId}`).then(response => {
      const { success, name, description, url, layout } = response.data;

      if (success && !this.state.isHamburgerMenuOpen) {
        this.setState({
          name: name,
          description: description,
          url: url,
          layout: layout,
          isLoading: false
        });
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
    this.setState({ modalIsOpen: true });
  }

  saveDashboard = () => {
    this.closeModal();
    this.getData();
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  deleteDashboard = () => {
    console.log(this.state.dashboardId);

    let dashboardId = this.state.dashboardId;

    api.delete(`dashboard/delete/${this.state.dashboardId}`)
      .then(response => {

        console.log(response);

        Alert.error('Dashboard was deleted', {
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

        this.props.history.push('/dashboard/' + response.data.newId);
        window.location.reload();


      });

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

    this.closeModal();
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
      dashboardId: this.state.dashboardId,
      layout: this.state.layout
    }
  ).then(response => {
    console.log(response);
  })
}

setHamburgerMenuOpen = (isOpen) => {
  this.setState({
    isHamburgerMenuOpen:isOpen,
  });
}


render() {

  const { user, cookies, autoLogin } = this.props;
  let { isAuthenticated } = this.props;

  const userCookie = cookies.get('user');

  if (isAuthenticated) {
    cookies.set('user', user);
  }

  if (userCookie) {
    isAuthenticated = true;
  }

  return (
    <div>
      <header className="header clearfix">

        <div className="container-fluid flexbox">
          <div className="logo-outer">
            <img src={logo} alt="Logo AMe"/>
          </div>

          <div className="intro">
            <div className="intro__div">
              <h2 className="intro__title">{this.state.name}</h2>
              <h3 className="intro__description">{this.state.description}</h3>
            </div>
            {isAuthenticated &&
              <button className="btn btn-default intro__button" onClick={() => { this.openModal(); }}><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
            }
          </div>

          {isAuthenticated ? (
            <HamburgerMenu setHamburgerMenuOpen={this.setHamburgerMenuOpen} openModal={() => {this.openModal();}} />
          ) : (
            <JustLogin dashboardId={this.props.match.params.dashboardId} />
          )}

        </div>

      </header>

      <div className="container">

        <div className="">

          {isAuthenticated &&
            <EditBar onEdit={this.toggleEdit} />
          }
          <DashboardIdProvider dashboardId={this.props.match.params.dashboardId}>
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
          </DashboardIdProvider>

          {isAuthenticated &&
            <AddWidgetDialog
              widgets={this.state.widgets}
              isModalOpen={this.state.isModalOpen}
              onRequestClose={this.onRequestClose}
              onWidgetSelect={this.widgetSelected}
            />
          }

          {isAuthenticated &&
            <Alert stack={{ limit: 3 }} />
          }

          {isAuthenticated &&
            <Modal
              isOpen={this.state.modalIsOpen}
              className='modal-dialog'
              //overlayClassName='edit_modal__overlay'
              onRequestClose={this.closeModal}
              contentLabel='Widget Editation'
              >
                <div className='modal-content'>

                  <div className="modal-header">
                    <button type="button" className="close" onClick={this.saveDashboard}>
                      <span aria-hidden="true">&times;</span>
                      <span className="sr-only">Close</span>
                    </button>
                    <h3 className="modal-title" ref={subtitle => this.subtitle = subtitle}>Dashboard Options</h3>
                  </div>

                  <div className="modal-body"><AdminEditForm blank={this.state.isHamburgerMenuOpen} dashboardId={this.props.match.params.dashboardId} /></div>

                  <div className="modal-footer">

                    {!this.state.isHamburgerMenuOpen &&
                      <button type="button" className="btn btn-default btn-delete float--left" onClick={this.deleteDashboard}>Delete Dashboard</button>
                    }
                    <button type="button" className="btn btn-default btn-close float--right" onClick={this.saveDashboard}>Close</button>
                  </div>

                </div>
              </Modal>
            }


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

const mapStateToProps = (storeState) => {
  const loginState = getLoginState(storeState);

  return {
    user: getUser(loginState),
    isAuthenticated: isAuthenticated(loginState),
  };
};

const AMeDashboardContainer = connect(
  mapStateToProps,
)(AMeDashboard);

export default withCookies(AMeDashboardContainer);
