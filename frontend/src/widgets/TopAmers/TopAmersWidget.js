import React, { Component } from 'react';
import AMer from '../../img/amer.png';
import Slider from 'react-slick';
import api from '../../api.js';

import { connectDashboardId } from '../../dashboardIdProvider';

import MDSpinner from "react-md-spinner";

class TopAmersWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topAmers: [],
      isLoading: true,
      dashboardId: this.props.dashboardId,
    };
  }

  componentDidMount() {
    api('top-amers', {params: {dashboardId: this.state.dashboardId}})
    .then(response => {
      const { data: topAmers } = response;
      this.setState({ topAmers, isLoading: false });
      console.log("AMERS",topAmers);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { topAmers } = this.state;

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
          <h2 className="widget__name">Top AMers (last week)</h2>
        </div>

        <div className="widget__content">

          { this.state.isLoading ? <MDSpinner className="md-spinner" /> : null }

          <ul className="top_amers__list">
          {topAmers.length === 0 ? <p className="no_data">No AMers to display</p> :
            <Slider {...settings}>
              {topAmers.map((topAmer, index) =>
                <li key={index} className="top_amers__list-item">
                  <div className="top_amers__image">
                    <img src={topAmer.image} alt={topAmer.realName} className="gif__image"/>
                    <span className="top_amers__badge">{topAmer.ameCount}x <img src={require("../../img/ame-small.png")} alt="" /></span>
                  </div>
                  <div className="top_amers__content clearfix">
                    <h3 className="top_amers__name float--left">{topAmer.realName}</h3>
                    <h5 className="top_amers__value float--right"><span className="small-text">rank</span> {index + 1}.</h5>
                  </div>
                </li>
              )}
            </Slider>
          }
          </ul>
        </div>
      </div>
    </div>
  );
}
}

export default connectDashboardId(TopAmersWidget);
