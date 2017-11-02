import React, { Component } from 'react';
import axios from 'axios';

export class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: ""
        };
    }

    // Jakmile se nahraje DOM pak se spustí tato metoda
    // Bacha - musíš použít data proměnnou !!
    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Prague,CZ&APPID=2bea6777b99c3b978671f4ab647b0948')
        .then(({data}) => {
            console.log(data);

            this.setState({
                cityName: data.city.name
            });
        })
        .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return(
            <div>
                <p>{this.state.cityName}</p>
            </div>
        )
    }
} 