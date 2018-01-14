/**
 *   TODO

Editovatelny list mest,
pridani mesta [jmeno, ""] -> geoCodeaddress -> [jmeno, latlng] -> pridani do pole ve state -> ulozeni lat / lng do DB -> nacteni z Weather api pomoci lat / lng

// Append an array
const newArr = [1,2,3,4]
this.setState({ arr: [...this.state.arr, ...newArr] });

// Append a single item
this.setState({ arr: [...this.state.arr, 'new item'] });

 */


import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import api from '../../api.js';
import { connectDashboardId } from '../../dashboardIdProvider';
let widgetType = "Weather";
let widgetId = 1;
let dashboardId = 1;


class WeatherEditForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lng: '',
      cityListInputValues: '',
    };
    this.onChange = (address) => this.setState({ address });
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }


  componentDidMount() {
    api('weather')
    .then(response => {
      const { cities } = response.data;

      console.log(response.data);

      for (var i = 0; i < cities.length; i++) {
        let citiesInput = this.formatCitiesInput(cities[i]);
        this.setState({
            cityListInputValues: citiesInput,
            offsets: [],
            address : "",
            });

          console.log("Weather Edit form",this.state.cityListInputValues);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


  handleFormSubmit = (event) => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then( ({ lat, lng }) => {
            this.setState({ lat: lat, lng: lng});

            let resultCount = 1;
            let apiKey = 'AIzaSyDDXOEh-jzoS5www_Yg5GpIa5ahA1VuKKg';

            let orgLat = lat;
            let orgLng = lng;

            lat = parseFloat(lat).toFixed(4);
            lng = parseFloat(lng).toFixed(4);

            axios.get('https://maps.googleapis.com/maps/api/geocode/json?language=en', { params: {latlng: lat+","+lng, key : apiKey} })
                    .then( (result) => {
                        const results = result.data.results;
                        const location = this.getLocation(results);
                        let citiesInput = this.formatCitiesInput(location.city);

                        axios.get('https://maps.googleapis.com/maps/api/timezone/json?language=en', {params: {location: orgLat+","+orgLng, timestamp: Math.floor(Date.now() / 1000), key: "AIzaSyBcWERvVwgoH27ILfRURoJTxOKhW7oKvIc"} })
                          .then( (result) => {
                              console.log(result.data.rawOffset);

                              this.setState((prevState) => ({
                                offsets: [...prevState.offsets, result.data.rawOffset]
                              }));
                        });

                        this.setState((prevState) => ({
                            cityListInputValues: citiesInput,
                            address: "",
                          }));
                    }
                    );
          } )
      .catch(error => console.error('Error', error));

    }

    getLocation = (results) => {
        let storableLocation = {};
        for (var ac = 0; ac < results[0].address_components.length; ac++) {
            var component = results[0].address_components[ac];

            switch(component.types[0]) {
                case 'locality':
                storableLocation.city = component.long_name;
            break;
                case 'administrative_area_level_1':
                storableLocation.state = component.short_name;
            break;
                case 'country':
                storableLocation.country = component.long_name;
                storableLocation.registered_country_iso_code = component.short_name;
            break;
            }
        };

        return storableLocation;
  }

  handleInputChange = (event) => {
      this.setState({cityListInputValues:event.target.value});
  }

  submit(event) {
        event.preventDefault();

        const citiesArray = this.state.cityListInputValues.split(", ");

        let settings = {cities: citiesArray, offsets: this.state.offsets};
        let data = {
            "widgetType": widgetType,
            "widgetId": widgetId,
            "dashboardId": dashboardId,
            "settings": settings
        };

        console.log(settings);


        api.post('weather', data)
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
    }

    formatCitiesInput(city) {
      let citiesInput = '';
      if (!this.state.cityListInputValues) {
        citiesInput = city;
      } else {
        citiesInput = this.state.cityListInputValues + ", " + city;
      }
      return citiesInput;
    }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder : "Search for a city!",
    };

    const placesCss = {
        input: 'form-control',
      }

    return(

      <div>
        <form onSubmit={this.handleFormSubmit}>

            <div className="form-group">
                <label className="weather__label">Selected Cities</label>
                <input type="text" className="form-control" id="cityListInput" aria-describedby="cityListInput" onChange={this.handleInputChange} value={this.state.cityListInputValues} placeholder=""></input>
            </div>

            <hr />

            <div className="form-group">
                <label className="weather__label weather__label--smaller">Add another city</label>
                <PlacesAutocomplete inputProps={inputProps} classNames={placesCss} />
                <button className="btn btn-default btn--green weather__margin-top_btn" type="submit">Add a city</button>
            </div>

            <div className="buttons">
              <button className="btn btn-default btn-save float--left" onClick={this.submit}>Save</button>
            </div>


        </form>
      </div>
    );
  }
}

export default connectDashboardId(WeatherEditForm);
