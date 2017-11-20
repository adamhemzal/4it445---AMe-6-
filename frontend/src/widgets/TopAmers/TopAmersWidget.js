import React, { Component } from 'react';
import axios from 'axios';
import AMer from '../../img/amer.png';
import Slider from 'react-slick';
import api from '../../api.js';

import MDSpinner from "react-md-spinner";

export class TopAmersWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topAmers: [],
      isLoading: true
    };
  }

  componentDidMount() {
    api('top-amers')
    .then(response => {
      const { data: topAmers } = response;
      this.setState({ topAmers, isLoading: false });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { topAmers } = this.state;

    { /*if (topAmers.length === 0) {
      //TODO vyrenderovat nějakou dummy compomentu
      return (
        <div className="widget top_amers">
          <div className="widget__inner widget__inner--dark">
          </div>
        </div>
      );
    } else { */

      const settings = {
        customPaging: i => {
          return <div className="top_amers__navigation-item col"><div className="top_amers__navigation-item-inner"><img src={topAmers[i].image} /></div></div>;
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
          {/* <div className="widget_settings__header">
            <i className="fa fa-wrench" aria-hidden="true"></i>
          </div> */}
          <div className="widget__inner widget__inner--dark">

            <div className="widget__header clearfix">
              <h2 className="widget__name">Top AMers</h2>
            </div>

            <div className="widget__content">

              { this.state.isLoading ? <MDSpinner className="md-spinner" /> : null }

              <ul className="top_amers__list">
                <Slider {...settings}>
                  {topAmers.map((topAmer, index) =>
                    <li key={index} className="top_amers__list-item">
                      <div className="top_amers__image">
                        <img src={topAmer.image} alt={topAmer.realName}/>
                        <span className="top_amers__badge">x{topAmer.ameCount}</span>
                      </div>
                      <div className="top_amers__content clearfix">
                        <h3 className="top_amers__name float--left">{topAmer.realName}</h3>
                        <h5 className="top_amers__value float--right">{index + 1}.</h5>
                      </div>
                    </li>
                  )}
                </Slider>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}
