import React, { Component } from 'react';
import axios from 'axios';
import ReactSlick from 'react-slick';

export class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cityName: "",
            weatherIcon: [],
            weatherTemperature: "",
            windSpeed: ""
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
                weatherTemperature: data.list[0].main.temp,
                windSpeed: data.list[0].wind.speed
            });
        })
        .catch((error) => {
            console.log(error);
          });
    }

    render() {

        //Mapování icon na IDčka
        const weatherIconMap = {
            "01d" : "wi-day-sunny",
            "01n" : "wi-night-clear",
            "02d" : "wi-day-cloudy",
            "02n" : "wi-night-alt-cloudy",
            "03d" : "wi-cloud",
            "03n" : "wi-cloud",
            "04d" : "wi-cloudy",
            "04n" : "",
            "09d" : "wi-showers",
            "09n" : "wi-showers",
            "10d" : "wi-rain",
            "10n" : "wi-rain",

        }
        
        // Vypiš iconu k počasí
        const weatherIconDisplay = this.state.weatherIcon.map((currentWeather, index) => {
            return <img key={index} src={`http://openweathermap.org/img/w/${currentWeather.icon}.png`} alt="" />
        });

        // Vypiš temperature v °C
        const weatherTemperatureDisplay = Math.round(this.state.weatherTemperature-273.15);
        
        // Definování datumů
        const currentDate = new Date();

        const hours = currentDate.getHours().toString().length === 1 ? '0'+currentDate.getHours() : currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().length === 1 ? '0'+currentDate.getMinutes() : currentDate.getMinutes();
        const time = hours + ":" + minutes;

        // Výpis data - čísla
        const date = currentDate.getDate();

        //Výpis jména měsíce
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const nameMonths = months[currentDate.getMonth()];

        return(
            <div className="col-md-4 widget weather">
                <div className="widget__inner">

                    <div className="widget__content">

                        <div className="weather__slide">

                            <div className="weather__icon">
                                {/* <i className="wi wi-night-sleet"></i> */}
                                {weatherIconDisplay}
                            </div>
                            <h3 className="weather__city">{this.state.cityName}</h3>

                        </div>

                    </div>

                    <div className="widget__footer widget__footer--dark clearfix no-padding">
                        <div className="float--left">
                            <h3 className="weather__temperature">{weatherTemperatureDisplay}<span>o</span></h3>
                            <h4 className="weather__wind"><i className="wi wi-strong-wind"></i>{this.state.windSpeed} m/s</h4>
                            {/* <h4 className="weather__humidity"><i className="wi wi-humidity"></i> 40%</h4> */}
                        </div>

                        <div className="float--right">
                            <div className="weather__date">
                                <h4 className="weather__day">{nameMonths} {date}</h4>
                                <h4 className="weather__time">{time}</h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
} 