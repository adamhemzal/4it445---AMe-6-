import React, { Component } from 'react';
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';

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
          <RadioGroup
            onChange = { this.handleChange.bind(this) }
            value = {this.state.selectedLayout}>

            <RadioButton value="layout1" padding="10">
              <i className="fa fa-cog"></i> 6 / 4 / 2
            </RadioButton>
            <RadioButton value="layout2" padding="10">
              4 / 4 / 2
            </RadioButton>
            <RadioButton value="layout3" padding="10">
              3 / 2
            </RadioButton>

            <RadioButton value="layout4" padding="10">
              4 / 3 / 2
            </RadioButton>

            <RadioButton value="layout5" padding="10">
              6 / 3 / 2
            </RadioButton>

          </RadioGroup>

        </div>
    </form>
    )
  }
}
