import React, { Component } from 'react';
import api from '../../api.js';
import axios from 'axios';
import { connectDashboardId } from '../../dashboardIdProvider';

class UpcomingEventsWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {

          isLoading: false,
        };
      }

      componentDidMount() {
//          this.getGifs();
      }

    //   getGifs() {
    //     const apiKeyGif = 'IJIIICknvqTbL8pdk93Kq0WeYOv9HHa6';

    //     axios.get('http://api.giphy.com/v1/gifs/trending?&api_key='+apiKeyGif+'&limit=1')
    //     .then(res => {
    //         const data = res.data.data[0].images.downsized_large;
    //         console.log(data);
    //         this.setState({
    //             gifs: data,
    //             isLoading: false,
    //         });
    //     });
    //   }

    render() {
        return(
            <div className="widget">
                <div className="widget__inner">
                    <div className="widget__header clearfix">
                        <h2 className="widget__name">Upcoming Events</h2>
                    </div>
                    <div className="widget__content event__padding-bottom container">

                        <div className="event">

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="event__info"><i className="fa fa-clock-o" aria-hidden="true"></i>Tommorow | 14:30 - 16:00</p>
                                </div>

                                <div className="col-md-12">
                                    <p className="event__name">Company Meeting</p>
                                </div>

                                <div className="col-md-12">
                                    <p className="event__info"><i className="fa fa-map-marker" aria-hidden="true"></i>Kozlovna</p>
                                </div>
                            </div>

                        </div>

                        <div className="event">

                            <div className="row">
                                <div className="col-md-12">
                                    <p className="event__info"><i className="fa fa-clock-o" aria-hidden="true"></i>Tommorow | 14:30 - 16:00</p>
                                </div>

                                <div className="col-md-12">
                                    <p className="event__name">Company Meeting</p>
                                </div>

                                <div className="col-md-12">
                                    <p className="event__info"><i className="fa fa-map-marker" aria-hidden="true"></i>Kozlovna</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default connectDashboardId(UpcomingEventsWidget);
