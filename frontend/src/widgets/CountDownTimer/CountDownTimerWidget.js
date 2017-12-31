import React, { Component } from 'react';

export class CountDownTimerWidget extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            timer: {},
            stateEventDate: 0,
            stateCurrentTime: 0,
        };
        this.countDownTime = 0;
      }

// INFO: https://stackoverflow.com/questions/40885923/countdown-timer-in-react
    
      componentDidMount() {
        this.countDownTime = setInterval(
            () => this.countingTime(),
            1000
          );
      }

      componentWillUnmount() {
        clearInterval(this.countDownTime);
      }

/*       componentDidMount() {
        this.timerID = setInterval(
            () => this.setCountingTime(),
            1000
          );
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      setCountingTime() {
        this.setState({
            timerDays: "",
            timerHours: "",
            timerMinutes: "",
          });
      } */

    render() {
        //60000 ms = 1 minuta
/*         const eventDate = new Date("April 5, 2018 18:25:00").getTime();
        const currentTime = new Date().getTime();
        const countingDown = setInterval(function() {
            const distance = eventDate - currentTime;

            const countDays = Math.floor(distance / (1000 * 60 * 60 * 24));
            const countHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const countMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance <= 0) {
                clearInterval(countingDown);
                document.getElementById("demo").innerHTML = "EXPIRED";
              }
        }, 1000); */
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
                                    <p>{this.state.timer.d === "" ? "0" : this.state.timer.d}</p>
                                </div>
                                <p className="timer__block-date">days</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>{this.state.timerHours === "" ? "0" : this.state.timerHours}</p>
                                </div>
                                <p className="timer__block-date">hours</p>
                            </div>

                            <div className="col-md-3 timer__center">
                                <div className="timer__block">
                                    <p>{this.state.timerMinutes === "" ? "0" : this.state.timerMinutes}</p>
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