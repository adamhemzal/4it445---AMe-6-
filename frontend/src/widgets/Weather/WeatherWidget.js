import React, { Component } from 'react';
import axios from 'axios';

export class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: "",
            weatherIcon: [],
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
                weatherIcon: data.list[0].weather,
                weatherTemperature: data.list[0].main.temp
            });
        })
        .catch((error) => {
            console.log(error);
          });
    }

    render() {

        // Vypiš iconu k počasí
        const weatherIconDisplay = this.state.weatherIcon.map((currentWeather, index) => {
            return <img key={index} src={`http://openweathermap.org/img/w/${currentWeather.icon}.png`} alt="" />
        });

        // Vypiš temperature v °C
        const weatherTemperatureDisplay = Math.round(this.state.weatherTemperature-273.15)+"°C";
        
        // Definování datumů
        const currentDate = new Date();

        const hours = currentDate.getHours().toString().length == 1 ? '0'+currentDate.getHours() : currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().length == 1 ? '0'+currentDate.getMinutes() : currentDate.getMinutes();
        const time = hours + ":" + minutes;

        const date = currentDate.getDate();

        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const nameMonths = months[currentDate.getMonth()];

        return(
            <div>
                <p>Mezera</p>
                <p>{weatherIconDisplay}</p>
                <p>{this.state.cityName}</p>
                <p>{weatherTemperatureDisplay}</p>
                <p>{time} {date} {nameMonths} </p>
            </div>
        )
    }
} 