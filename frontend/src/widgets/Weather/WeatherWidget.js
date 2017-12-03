import React, { Component } from 'react';
import api from '../../api.js';
import axios from 'axios';
import Slider from 'react-slick';
import MDSpinner from "react-md-spinner";
import moment from 'moment';

export class WeatherWidget extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      weatherCities: [],
      isLoading: true,
      time: moment().format('LT'),
      date: moment().format('MMM D'),
    };
  }

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    api('weather')
    .then(response => {
      const cities = response.data;
      this.getWeatherFromCities(cities);
    })
    .catch(error => {
      console.log(error);
    });

    this.timerID = setInterval(
      () => this.setTime(),
      20000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getWeatherFromCities(cities) {
    const resultCount = 1;
    const units = 'metric';
    const apiKey = '2bea6777b99c3b978671f4ab647b0948';

    let promises = [];
    let weatherCitiesData = [];

    cities.forEach((city) => {
      promises.push(axios.get('http://api.openweathermap.org/data/2.5/forecast', { params: {q: city, appid: apiKey, units: units, cnt: resultCount} }));
    });

    axios.all(promises)
    .then(axios.spread((...results) => {
      for (let i = 0; i < results.length; i++) {
        weatherCitiesData.push(results[i]);
      }
      this.setState({
        weatherCities: weatherCitiesData,
        isLoading: false
      });
    }));
  }

  setTime() {
    this.setState({
      time: moment().format('LT'),
      date: moment().format('MMM D'),
    });
  }

  render() {
    //Slick settings
    const weatherSettings = {
      speed: 500,
      fade: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      nextArrow: <NextArrow className={this.props.className}/>,
      prevArrow: <PrevArrow className={this.props.className}/>,
    };

    const isLoading = this.state;

    return (
      <div className="widget weather">

        { this.state.isLoading ? <MDSpinner className="md-spinner" /> : null }


        <Slider {...weatherSettings}>

          {this.state.weatherCities.map((city, index) =>

            <div key={index} className="widget__inner">

              <div className="widget__content">

                <div className="weather__slide">

                  <div className="weather__icon">
                    {
                      displayWeatherIcon(city.data.list[0].weather[0].icon)
                    }
                  </div>

                  <h3 className="weather__city">{city.data.city.name}</h3>
                </div>
              </div>

              <div className="widget__footer widget__footer--dark clearfix no-padding">
                <div className="float--left">
                  <h3 className="weather__temperature">{Math.round(city.data.list[0].main.temp)}<span>o</span></h3>
                  <h4 className="weather__wind"><i className="wi wi-strong-wind"></i>{city.data.list[0].wind.speed} m/s</h4>
                </div>

                <div className="float--right">
                  <div className="weather__date">
                    <h4 className="weather__day">{this.state.date}</h4>
                    <h4 className="weather__time">{this.state.time}</h4>
                  </div>
                </div>

              </div>
            </div>
          )}

        </Slider>

      </div>
    )

  }
}

// Stateless component - NextArrow - Slider
const NextArrow = (props) => {
  const {className, style, onClick} = props

  return (
    <div
      className={"slick-arrow " + "slick-next " + "weather__slide--arrow-right " + "weather__slide--arrow-right::before"}
      style={{...style, display: 'block'}}
      onClick={onClick}
      ></div>
    );
  }

  // Stateless component - PrevArrow - Slider
  const PrevArrow = (props) => {
    const {className, style, onClick} = props

    return (
      <div
        className={"slick-arrow " + "slick-prev " + "weather__slide--arrow-left " + "weather__slide--arrow-left::before"}
        style={{...style, display: 'block'}}
        onClick={onClick}
        ></div>
      );
    }


    // Vypiš iconu k počasí
    const displayWeatherIcon = (icon) => {
      let weatherIcon;
      switch (icon) {
        case "01d":
        weatherIcon = "wi-day-sunny"
        break;
        case "01n":
        weatherIcon = "wi-night-clear"
        break;
        case "02d":
        weatherIcon = "wi-day-cloudy"
        break;
        case "02n":
        weatherIcon = "wi-night-alt-cloudy"
        break;
        case "03d":
        weatherIcon = "wi-cloud"
        break;
        case "03n":
        weatherIcon = "wi-cloud"
        break;
        case "04d":
        weatherIcon = "wi-cloudy"
        break;
        case "04n":
        weatherIcon = "wi-cloudy"
        break;
        case "09d":
        weatherIcon = "wi-showers"
        break;
        case "09n":
        weatherIcon = "wi-showers"
        break;
        case "10d":
        weatherIcon = "wi-rain"
        break;
        case "10n":
        weatherIcon = "wi-rain"
        break;
        case "11d":
        weatherIcon = "wi-thunderstorm"
        break;
        case "11n":
        weatherIcon = "wi-thunderstorm"
        break;
        case "13d":
        weatherIcon = "wi-snow"
        break;
        case "13n":
        weatherIcon = "wi-snow"
        break;
        case "50d":
        weatherIcon = "wi-fog"
        break;
        case "50n":
        weatherIcon = "wi-fog"
        break;
        default:
        weatherIcon = "Není k dispozici"
      }
      return <i className={`wi ${weatherIcon}`}></i>
    }
