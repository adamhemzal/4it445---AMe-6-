import React, { Component } from 'react';
import axios from 'axios';

export class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: "",
            weatherInfo: [],
            weatherTemperature: ""
        };
    }

    // Vzorec na převod kelvinů na stupně T(°C) = T(K) - 273.15
    // Jakmile se nahraje DOM pak se spustí tato metoda
    // Bacha - musíš použít data proměnnou !!
    componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Prague,CZ&APPID=2bea6777b99c3b978671f4ab647b0948')
        .then(({data}) => {
            console.log(data);
            console.log(data.list[0].weather)
            this.setState({
                cityName: data.city.name,
                weatherInfo: data.list[0].weather,
                weatherTemperature: data.list[0].main.temp
            });
        })
        .catch((error) => {
            console.log(error);
          });
    }

    render() {
        const weatherInfoDisplay = this.state.weatherInfo.map((currentWeather, index) => {
            return <div key={index}> <p>{ currentWeather.icon }</p> </div>
        });

        const weatherTemperatureDisplay = Math.round(this.state.weatherTemperature-273.15)+"°C";
        
        return(
            <div>
                <p>Mezera</p>
                <p>{weatherInfoDisplay}</p>
                <p>{this.state.cityName}</p>
                <p>{weatherTemperatureDisplay}</p>
            </div>
        )
    }
} 