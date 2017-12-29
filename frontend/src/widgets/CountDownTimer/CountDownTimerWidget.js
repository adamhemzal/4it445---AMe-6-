import React, { Component } from 'react';

export class CountDownTimerWidget extends React.PureComponent {
    render() {
        return(
            <div className="widget">
                <div className="widget__inner">
                
                    <div className="widget__header widget__inner--dark clearfix">
                        <h2 className="widget__name">Count Down Timer to the nearest event</h2>
                    </div>

                    <div className="container widget__content">
                        
                        <div className="row timer__flex-center">

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>5</p>
                                </div>
                                <p className="timer__block-date">days</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>15</p>
                                </div>
                                <p className="timer__block-date">hours</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>55</p>
                                </div>
                                <p className="timer__block-date">minutes</p>
                            </div>

                        </div>

                        <div className="row timer__padding-both">
                            <div className="col-md-12 timer__flex">
                                <p className="timer__to">to</p>
                            </div>
                        </div>

                        <div className="row timer__padding-both timer__padding-bottom">
                            <div className="col-md-12 timer__flex">
                                <p className="timer__event-name">Company meeting</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}