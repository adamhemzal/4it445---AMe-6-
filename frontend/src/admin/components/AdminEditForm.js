import React, { Component } from 'react';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';


/*

- 6 / 4 / 2 (6 widgetů na jedné řádce, 4 na druhé, 2 na třetí)

rows: [
  {
      columns: [{
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }, { key: 'AlienWidget' }, { key: 'RocketWidget' }],
      }, {
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-2 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }, {
      columns: [{
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-6 col-xs-6',
        widgets: [{ key: 'RocketWidget' }],
      }],
    }, {
        columns: [{
          className: 'col-md-6 col-sm-6 col-xs-6',
          widgets: [{ key: 'RocketWidget' }],
        }, {
          className: 'col-md-6 col-sm-6 col-xs-6',
          widgets: [{ key: 'RocketWidget' }],
        }],
  }
],

- 4 / 4 / 2

rows: [
  {
      columns: [{
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }, { key: 'AlienWidget' }, { key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
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
      }, {
        className: 'col-md-3 col-sm-4 col-xs-4',
        widgets: [{ key: 'RocketWidget' }],
      }],
  }, {
      columns: [{
        className: 'col-md-6 col-sm-6 col-xs-6',
        widgets: [{ key: 'RocketWidget' }],
      }, {
        className: 'col-md-6 col-sm-6 col-xs-6',
        widgets: [{ key: 'RocketWidget' }],
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
      name: 'My awesome dashboard title',
      url: '',
      selectedLayout: 'layout3',
    };
  }

  handleChange(value) {
    this.setState({ selectedLayout: value });
    console.log(this.state.selectedLayout);
  }

  render() {

    return(
      <form>
        <div class="form-group">
          <label for="dashboardName">Dashboard Title</label>
          <input type="email" className="form-control" id="dashboardName" value={this.state.name} aria-describedby="dashboardName" placeholder="Enter Dashboard Title"></input>

          <label for="dashboardUrl">Dashboard URL</label>
          <input type="text" className="form-control" id="dashboardUrl" value={this.state.url} aria-describedby="dashboardUrl" placeholder="Enter Dashboard URL"></input>


          <label for="">Dashboard Layout</label>

          <div className="layout-options">
            <RadioGroup
              onChange = { this.handleChange.bind(this) }
              value = {this.state.selectedLayout}
              horizontal>

              <RadioButton value="layout1" padding="10" className="radio-button">
                <img src={require("../../img/layout1.png")} alt="" /> 6 / 4 / 2
              </RadioButton>
              <RadioButton value="layout2" padding="10">
                <img src={require("../../img/layout2.png")} alt="" /> 4 / 4 / 2
              </RadioButton>
              <RadioButton value="layout3" padding="10">
                <img src={require("../../img/layout3.png")} alt="" />3 / 2
              </RadioButton>

              <RadioButton value="layout4" padding="10">
                <img src={require("../../img/layout4.png")} alt="" /> 4 / 3 / 2
              </RadioButton>

              <RadioButton value="layout5" padding="10">
                <img src={require("../../img/layout5.png")} alt="" /> 6 / 3 / 2
              </RadioButton>

            </RadioGroup>
          </div>

        </div>
    </form>
    )
  }
}
