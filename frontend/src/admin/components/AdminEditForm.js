import React, { Component } from 'react';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import api from '../../api.js';
import Alert from 'react-s-alert';

/*

- 6 / 4 / 2 (6 widgetů na jedné řádce, 4 na druhé, 2 na třetí)

rows: [
  {
    columns: [{
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'TopAmePosts' }],
    }, {
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'TopAmers' }],
    }, {
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'Weather' }],
    }, {
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'PeopleOfADay' }],
    }, {
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'GifOfADay' }],
    }, {
      className: 'col-md-2 col-sm-4 col-xs-4',
      widgets: [{ key: 'Weather' }],
    }],
  }, {
      columns: [{
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'PeopleOfADay' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'Weather' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'Weather' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'TopAmers' }],
      }],
    }, {
        columns: [{
          className: 'col-md-6 col-sm-6 col-xs-6',
          widgets: [{ key: 'GifOfADay' }],
        }, {
          className: 'col-md-6 col-sm-6 col-xs-6',
          widgets: [{ key: 'TopAmers' }],
        }],
  }
]

- 4 / 4 / 2

rows: [
  {
      columns: [{
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'PeopleOfADay' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'TopAmers' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'Weather' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'GifOfADay' }],
      }],
  }, {
      columns: [{
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'TopAmePosts' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'Weather' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'PeopleOfADay' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'GifOfADay' }],
      }],
  }, {
      columns: [{
        className: 'col-md-6 col-sm-6 col-xs-6',
        widgets: [{ key: 'GifOfADay' }],
      }, {
        className: 'col-md-6 col-sm-6 col-xs-6',
        widgets: [{ key: 'TopAmers' }],
      }],
  }
],

- 3 / 2

rows: [
  {
      columns: [{
        className: 'col-md-4 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }, { key: 'AlienWidget' }, { key: 'RocketWidget' }],
      }, {
        className: 'col-md-4 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-4 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-4 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }, {
      columns: [{
        className: 'col-md-6 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-6 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }
],

- 4 / 3 / 2

rows: [
  {
      columns: [{
        className: 'col-md-3 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }, { key: 'AlienWidget' }, { key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }, {
        columns: [{
          className: 'col-md-3 col-sm-4 col-xs-4',
          widgets: [{ key: 'RocketWidget' }, { key: 'AlienWidget' }, { key: 'RocketWidget' }],
        }, {
          className: 'col-md-3 col-sm-4 col-xs-4',
          widgets: [{ key: 'RocketWidget' }],
        }, {
          className: 'col-md-3 col-sm-4 col-xs-4',
          widgets: [{ key: 'RocketWidget' }],
        }],
  }, {
      columns: [{
        className: 'col-md-6 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-6 col-sm-6 col-xs-12',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }
],


- 6 / 3 / 2

*/

export class AdminEditForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      url: '',
      selectedLayout: '0',
      layout: layoutTypes[0].layout
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log(this.state.name)
  }

  componentDidMount() {
    api.get(`dashboard/info/1`).then(response => {
      const { success, name, description, url, layout } = response.data;
      if (success) {
        this.setState({
            name: name,
            description: description,
            url: url,
            selectedLayout: layout.id,
            layout: layout.layout,
          });

          console.log(this.state.selectedLayout);
        // Pokud se nepovede ziskat layout z DB, pouzije se defaultni.
      } else {
        this.setState({
          layout: layoutTypes[0].layout
            // rows: [{
            //   columns: [{
            //     className: 'col-md-4',
            //     widgets: [{ key: 'TopAmePosts' }],
            //   }, {
            //     className: 'col-md-4',
            //     widgets: [{ key: 'TopAmers' }],
            //   }, {
            //     className: 'col-md-4',
            //     widgets: [{ key: 'Weather' }],
            //   },{
            //     className: 'col-md-4',
            //     widgets: [{ key: 'PeopleOfADay' }],
            //   }],
            // }]
        })
      }
    }).catch(error => {
      console.log(error);
    });
  }

  saveDashboard = () => {

    console.log(this.state.selectedLayout);
    console.log(this.state.layout);

    api.post('dashboard/info',
      {
        dashboardId: 1,
        name: this.state.name,
        description: this.state.description,
        url: this.state.url,
        layout: layoutTypes[this.state.selectedLayout]
      }
    ).then(response => {
      console.log(response);
      console.log(this.state.selectedLayout)

      Alert.success('Options were saved.', {
        position: 'top-right',
        effect: 'slide',
        onShow: function () {
          console.log('aye!')
        },
        beep: false,
        timeout: 2500,
        offset: 100
      });

    })
  }

  handleChange(value) {
    this.setState({ selectedLayout: value, layout: layoutTypes[value].layout });
  }

  render() {

    return(
      <form>
        <div className="form-group">
          <label htmlFor="dashboardName">Dashboard Title</label>
          <input onChange={this.handleInputChange} type="text" name="name" className="form-control" id="dashboardName" value={this.state.name} aria-describedby="dashboardName" placeholder="Enter Dashboard Title" required />

          <label htmlFor="dashboardDescription">Dashboard Description</label>
          <input onChange={this.handleInputChange} type="text" name="description" className="form-control" id="dashboardDescription" value={this.state.description} aria-describedby="dashboardDescription" placeholder="Enter Dashboard Description" required />


          <label htmlFor="dashboardUrl">Dashboard URL</label>
          <input onChange={this.handleInputChange} type="text" name="url" className="form-control" id="dashboardUrl" value={this.state.url} aria-describedby="dashboardUrl" placeholder="Enter Dashboard URL" required />


          <label htmlFor="">Dashboard Layout</label>

          <div className="layout-options">
            <RadioGroup
              onChange = { this.handleChange.bind(this) }
              value = {this.state.selectedLayout}
              horizontal>

              <RadioButton value="0" padding="10" className="radio-button">
                <img src={require("../../img/layout1.png")} alt="" /> 6 / 4 / 2
              </RadioButton>
              <RadioButton value="1" padding="10">
                <img src={require("../../img/layout2.png")} alt="" /> 4 / 4 / 2
              </RadioButton>
              <RadioButton value="2" padding="10">
                <img src={require("../../img/layout3.png")} alt="" />3 / 2
              </RadioButton>

              <RadioButton value="3" padding="10">
                <img src={require("../../img/layout4.png")} alt="" /> 4 / 3 / 2
              </RadioButton>

              <RadioButton value="4" padding="10">
                <img src={require("../../img/layout5.png")} alt="" /> 6 / 3 / 2
              </RadioButton>

            </RadioGroup>
          </div>


          <button type="button" className="btn btn-default btn-save float--left" onClick={this.saveDashboard}>Save</button>

        </div>
    </form>
    )
  }
}

const layoutTypes = [
  {
    id: 0,
    layout: {
      rows: [
      {
        columns: [{
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'TopAmePosts' }],
        }, {
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'TopAmers' }],
        }, {
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'Weather' }],
        }, {
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'PeopleOfADay' }],
        }, {
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'GifOfADay' }],
        }, {
          className: 'col-md-2 col-sm-4 col-xs-4',
          widgets: [{ key: 'Weather' }],
        }],
      }, {
          columns: [{
            className: 'col-md-3 col-sm-6 col-xs-6',
            widgets: [{ key: 'PeopleOfADay' }],
          }, {
            className: 'col-md-3 col-sm-6 col-xs-6',
            widgets: [{ key: 'Weather' }],
          }, {
            className: 'col-md-3 col-sm-6 col-xs-6',
            widgets: [{ key: 'Weather' }],
          }, {
            className: 'col-md-3 col-sm-6 col-xs-6',
            widgets: [{ key: 'TopAmers' }],
          }],
        }, {
            columns: [{
              className: 'col-md-6 col-sm-6 col-xs-6',
              widgets: [{ key: 'GifOfADay' }],
            }, {
              className: 'col-md-6 col-sm-6 col-xs-6',
              widgets: [{ key: 'TopAmers' }],
            }],
      }
    ]
  }
}, {
    id: 1,
    layout: {
      rows: [
        {
            columns: [{
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'PeopleOfADay' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'TopAmers' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'Weather' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'GifOfADay' }],
            }],
        }, {
            columns: [{
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'TopAmePosts' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'Weather' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'PeopleOfADay' }],
            }, {
              className: 'col-md-3 col-sm-4 col-xs-4',
              widgets: [{ key: 'GifOfADay' }],
            }],
        }, {
            columns: [{
              className: 'col-md-6 col-sm-6 col-xs-6',
              widgets: [{ key: 'GifOfADay' }],
            }, {
              className: 'col-md-6 col-sm-6 col-xs-6',
              widgets: [{ key: 'TopAmers' }],
            }],
        }
      ],
    }
  }, {
    id: 2,
    layout: {
      rows: [
        {
            columns: [{
              className: 'col-md-4 col-sm-6 col-xs-12',
              widgets: [{ key: 'GifOfADay' }],
            }, {
              className: 'col-md-4 col-sm-6 col-xs-12',
              widgets: [{ key: 'TopAmers' }],
            }, {
              className: 'col-md-4 col-sm-6 col-xs-12',
              widgets: [{ key: 'TopAmePosts' }],
            }],
        }, {
            columns: [{
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{ key: 'Weather' }],
            }, {
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{ key: 'PeopleOfADay' }],
            }],
        }
      ],
    }
  }, {
    id: 3,
    layout: {
      rows: [
        {
            columns: [{
              className: 'col-md-3 col-sm-6 col-xs-12',
              widgets: [{ key: 'PeopleOfADay' }],
            }, {
              className: 'col-md-3 col-sm-6 col-xs-12',
              widgets: [{ key: 'Weather' }],
            }, {
              className: 'col-md-3 col-sm-6 col-xs-12',
              widgets: [{ key: 'TopAmePosts' }],
            }, {
              className: 'col-md-3 col-sm-6 col-xs-12',
              widgets: [{ key: 'TopAmers' }],
            }],
        }, {
              columns: [{
                className: 'col-md-3 col-sm-4 col-xs-4',
                widgets: [{ key: 'GifOfADay' }],
              }, {
                className: 'col-md-3 col-sm-4 col-xs-4',
                widgets: [{ key: 'TopAmePosts' }],
              }, {
                className: 'col-md-3 col-sm-4 col-xs-4',
                widgets: [{ key: 'Weather' }],
              }],
        }, {
            columns: [{
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{ key: 'TopAmePosts' }],
            }, {
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{ key: 'Weather' }],
            }],
        }
      ],
    }
  }
];
