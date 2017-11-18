import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherCities: []
        };
    }

    // Vzorec na převod kelvinů na stupně T(°C) = T(K) - 273.15
    // Jakmile se nahraje DOM pak se spustí tato metoda
    // Bacha - musíš použít data proměnnou !!
    componentDidMount() {
        this.getWeatherFromCities("London", "Prague", "Moscow", "Berlin");
    }

    getWeatherFromCities(firstCity, secondCity, thirdCity, fourthCity) {
        axios.all([
            axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+firstCity+'&APPID=2bea6777b99c3b978671f4ab647b0948'),
            axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+secondCity+'&APPID=2bea6777b99c3b978671f4ab647b0948'),
            axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+thirdCity+'&APPID=2bea6777b99c3b978671f4ab647b0948'),
            axios.get('http://api.openweathermap.org/data/2.5/forecast?q='+fourthCity+'&APPID=2bea6777b99c3b978671f4ab647b0948')
          ])
          .then(axios.spread((firstCityData, secondCityData, thirdCityData, fourthCityData) => {
            const weatherCitiesData = [firstCityData, secondCityData, thirdCityData, fourthCityData];
            this.setState({
                weatherCities: weatherCitiesData
            });
          }));
    }

    render() {



                // Vypiš iconu k počasí
                const displayWeatherIcon = (icon) => {
                    let weatherIcon;
                    switch(icon) {
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

        // Stateless component - NextArrow - Slider
        const NextArrow = (props) => {  
            const {className, style, onClick} = props
            return (
                <div
                    className={"slick-arrow "+"slick-next "+"weather__slide--arrow-right "+"weather__slide--arrow-right::before"}
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
                    className={"slick-arrow "+"slick-prev "+"weather__slide--arrow-left "+"weather__slide--arrow-left::before"}
                    style={{...style, display: 'block'}}
                    onClick={onClick}
                ></div>
            );
        } 

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

        return(
        <div className="col-lg-4 col-md-12 widget weather">
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
                        <h3 className="weather__temperature">{Math.round(city.data.list[0].main.temp-273.15)}<span>o</span></h3>
                        <h4 className="weather__wind"><i className="wi wi-strong-wind"></i>{city.data.list[0].wind.speed} m/s</h4>
                    </div>

                    <div className="float--right">
                        <div className="weather__date">
                            <h4 className="weather__day">{nameMonths} {date}</h4>
                            <h4 className="weather__time">{time}</h4>
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