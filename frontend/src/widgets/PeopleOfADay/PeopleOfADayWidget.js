import React, { Component } from 'react';
import AMer from '../../img/person.jpg';
import Slider from 'react-slick';
import api from '../../api.js';
import { connectDashboardId } from '../../dashboardIdProvider';

import MDSpinner from "react-md-spinner";

class PeopleOfADayWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            peopleDay: [],
            isLoading: true
        };
    }

    componentDidMount() {
        api('people-day', {params: {dashboardId: this.state.dashboardId}})
            .then(response => {
                const { data: peopleDay } = response;
                this.setState({ peopleDay, isLoading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { peopleDay } = this.state;



        const settings = {
            customPaging: i => {
                return <div className="top_amers__navigation-item col"><div className="top_amers__navigation-item-inner"><img src={peopleDay[i].image} /></div></div>;
            },
            dots: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            dotsClass: "top_amers__navigation",
            arrows: false
        };

        const isLoading = this.state;

        return (
            <div className="widget top_amers">

                <div className="widget__inner widget__inner--dark">

                    <div className="widget__header clearfix">
                        <h2 className="widget__name">People of the Day</h2>
                    </div>

                    <div className="widget__content">

                        <ul className="top_amers__list">
                            <li className="top_amers__list-item">
                                <div className="top_amers__image">
                                    <img src={AMer} alt="" />
                                    <span className="top_amers__badge">Jan Novák</span>
                                </div>

                                <div className="top_amers__content clearfix">
                                    <h5 className="top_amers__value text-center">Rád si hraje s kočičkama</h5>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* <div className="widget__footer widget__footer--white text-center">
                        <div className="top_amers__navigation">
                            <ul>
                                <li className="top_amers__navigation-item">
                                    <div className="top_amers__navigation-item-inner">
                                        <a href="#">Karel</a>
                                    </div>
                                </li>
                                <li className="top_amers__navigation-item col">
                                    <div className="top_amers__navigation-item-inner">
                                        <a href="#">Luboš</a>
                                    </div>
                                </li>
                                <li className="top_amers__navigation-item col">
                                    <div className="top_amers__navigation-item-inner">
                                        <a href="#">Rozárie</a>
                                    </div>
                                </li>
                                <li className="top_amers__navigation-item col">
                                    <div className="top_amers__navigation-item-inner">
                                        <a href="#">Žaneta</a>
                                    </div>
                                </li>
                                <li className="top_amers__navigation-item col">
                                    <div className="top_amers__navigation-item-inner">
                                        <a href="#">Světlana</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div> */}

                </div>

            </div>
        );
    }
}

export default connectDashboardId(PeopleOfADayWidget);
