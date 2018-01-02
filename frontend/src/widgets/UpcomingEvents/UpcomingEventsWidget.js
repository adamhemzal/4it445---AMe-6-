import React, { Component } from 'react';
import api from '../../api.js';
import axios from 'axios';

export class UpcomingEventsWidget extends Component {

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
            <div className="widget gif">
                <div className="widget__inner">
                    <div className="widget__header clearfix">
                        <h2 className="widget__name">Upcoming Events</h2>
                    </div>
                    <div className="widget__content">
                    <div className="top_posts__list" className="timer__to"><p>Tommorow | 14:30 - 16:00</p>
                        <p className="timer__event-name">Company Meeting</p>
                        <p className="timer__to">Kozlovna</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}