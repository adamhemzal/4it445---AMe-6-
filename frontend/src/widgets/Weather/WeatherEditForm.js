import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export class WeatherEditForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      address: 'San Francisco, CA',
      lat: '',
      lng: '',
    }
    this.onChange = (address) => this.setState({ address })
  }


  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.setState({ lat: lat, lng: lng}))
      .catch(error => console.error('Error', error))
  }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return(

      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Channel ID</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter channel ID"></input>
          </div>

            <PlacesAutocomplete inputProps={inputProps} />
            <button type="submit">Find coordinates</button>
        </form>

        <p>{this.state.address}</p>
        <span>{this.state.lat}</span>, <span>{this.state.lng}</span>
      </div>
    )
  }
}
