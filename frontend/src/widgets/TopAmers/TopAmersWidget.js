import React, { Component } from 'react';
import axios from 'axios';
import AMer from '../../img/amer.png';

export class TopAmersWidget extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
                
                <div className="col-md-4 widget top_amers">

                            <div className="widget__inner widget__inner--dark">

                                <div className="widget__header clearfix">
                                    <h2 className="widget__name">Top AMers</h2>
                                </div>

                                <div className="widget__content">

                                    <ul className="top_amers__list">
                                        <li className="top_amers__list-item">

                                            <div className="top_amers__image">
                                                <img src={AMer} alt=""/> 
                                                <span className="top_amers__badge">3.</span>
                                            </div>

                                            <div className="top_amers__content clearfix">
                                                <h3 className="top_amers__name float--left">Lucy Wilde</h3>
                                                <h5 className="top_amers__value float--right">x65</h5>
                                            </div>

                                        </li>
                                    </ul>

                                </div>

                                <div className="widget__footer widget__footer--white text-center">

                                    <div className="top_amers__navigation clearfix">
                                        <ul>
                                            <li className="top_amers__navigation-item col">
                                                <div className="top_amers__navigation-item-inner">
                                                    <a href="#"><img src={AMer} alt="" /></a>
                                                </div>
                                            </li>
                                            <li className="top_amers__navigation-item col">
                                                <div className="top_amers__navigation-item-inner">
                                                    <a href="#"><img src={AMer} alt=""/></a>
                                                </div>
                                            </li>
                                            <li className="top_amers__navigation-item col">
                                                <div className="top_amers__navigation-item-inner">
                                                    <a href="#"><img src={AMer} alt="" /></a>
                                                </div>
                                            </li>
                                            <li className="top_amers__navigation-item col">
                                                <div className="top_amers__navigation-item-inner">
                                                    <a href="#"><img src={AMer} alt="" /></a>
                                                </div>
                                            </li>
                                            <li className="top_amers__navigation-item col">
                                                <div className="top_amers__navigation-item-inner">
                                                    <a href="#"><img src={AMer} alt="" /></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                )
    }
} 
