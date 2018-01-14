import React, { Component } from 'react';
import { connectDashboardId } from '../../dashboardIdProvider';

class CountDownTimerWidget extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            timer: {},
            stateEventDate: 0,
            stateCurrentTime: 0,
            dashboardId: this.props.dashboardId,
        };
        this.countDownTime = 0;
      }

      componentDidMount() {
        //Tohle příjde nahradit za API
        const eventDate = new Date("April 5, 2018 18:25:00").getTime();
        
        this.countDownTime = setInterval(
            () => this.countingTime(eventDate),
            1000
          );
      }

      componentWillUnmount() {
        clearInterval(this.countDownTime);
      }



    countingTime(date) {
        const currentTime = new Date().getTime();
        const distance = date - currentTime;

        const countDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const countHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const countMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        //const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        //pro testování sekund
        //console.log("SEKUNDY", seconds);

        let timeObject = {
            day : countDays,
            hours : countHours,
            minutes : countMinutes,
            //seconds : seconds,
        }

        this.setState({
            timer: timeObject,
        });
    }

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
                                    <p>{this.state.timer.day === "" ? "0" : this.state.timer.day}</p>
                                </div>
                                <p className="timer__block-date">days</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>{this.state.timer.hours === "" ? "0" : this.state.timer.hours}</p>
                                </div>
                                <p className="timer__block-date">hours</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>{this.state.timer.minutes === "" ? "0" : this.state.timer.minutes}</p>
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

export default connectDashboardId(CountDownTimerWidget);
