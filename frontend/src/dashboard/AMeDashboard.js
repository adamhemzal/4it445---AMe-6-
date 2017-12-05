import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import CustomFrame from './CustomFrame';

import { WeatherWidget } from '../widgets/Weather/WeatherWidget';
import { TopAmersWidget } from '../widgets/TopAmers/TopAmersWidget';
import { TopAmePostsWidget } from '../widgets/TopAmePosts/TopAmePostsWidget';
import { PeopleOfADayWidget } from '../widgets/PeopleOfADay/PeopleOfADayWidget';
//import { HamburgerMenu } from './menu/HamburgerMenu';
import { JustLogin } from './menu/JustLogin';

// Dazzle
import EditBar from './EditBar';
import AddWidgetDialog from './AddWidgetDialog';
import MDSpinner from "react-md-spinner";
import api from '../api.js';

import logo from '../img/logo.png';

import 'react-dazzle/lib/style/style.css';

//import { Admin } from '../admin/Admin';

export class AMeDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      name: '',
      description: '',

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
        }
      },

      editMode: false,
      isModalOpen: false,
      addWidgetOptions: null
    };

  }

  componentDidMount() {
    api.get(`dashboard/info/1`).then(response => {
      const { success, name, description, url, layout } = response.data;
      if (success) {
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

          <div className="intro__div">
            <h2 className="intro__title">{this.state.name}</h2>
            <h3 className="intro__description">{this.state.description}</h3>
          </div>

          {/* <HamburgerMenu /> */}
          <JustLogin />

        </div>

      </header>

      <div className="container">

        <div className="">

          {/* <EditBar onEdit={this.toggleEdit} /> */}
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

          { /*  <TopAmePostsWidget />
            <TopAmersWidget />
            <WeatherWidget /> */ }

{/*             <AddWidgetDialog
              widgets={this.state.widgets}
              isModalOpen={this.state.isModalOpen}
              onRequestClose={this.onRequestClose}
              onWidgetSelect={this.widgetSelected}
            /> */}

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
