import React, { Component } from 'react';
import axios from 'axios';
import api from '../../api.js';
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import MDSpinner from "react-md-spinner";


const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

export class TopAmePostsWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topAmePosts: [],
      isLoading: true
    };
  }

  componentDidMount() {
    api('top-ame-posts')
    .then(response => {
      const {data: topAmePosts} = response;
      this.setState({topAmePosts, isLoading: false });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { topAmePosts, isLoading } = this.state;

    return(
      <div className="widget top_posts">

        <div className="widget__inner">

          <div className="widget__header clearfix">
            <h2 className="float--left widget__name">Top AMe Posts</h2>
            <h3 className="float--right">4IT445 <span>#general</span></h3>
          </div>

          <div className="widget__content widget__content--padding">

            { this.state.isLoading ? <MDSpinner className="md-spinner" /> : null }

            <ul className="top_posts__list">
              {topAmePosts.map((topAmePost, index) =>
                <TopAmePost key={index} data={topAmePost} />
              )}
            </ul>

          </div>

          <div className="widget__footer text-center">
            <a className="btn btn--link" href="#" role="button">See All</a>
          </div>

        </div>

      </div>
    );
  }
}

class TopAmePost extends Component {
  render() {
    return (
        <li className="top_posts__list-item">
          <h3 className="top_posts_post-title">
          <a target="_" className="top_posts_post-link" href={this.props.data.link}>
              <ResponsiveEllipsis
                  text={this.props.data.text}
                  maxLine='3'
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                  />
            </a>
          </h3>
          <div className="clearfix">
            <h4 className="top_posts__name"><a target="_" href={this.props.data.userLink}>{this.props.data.realName}</a></h4>
            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i>x{this.props.data.ameCount}</h5>
          </div>
        </li>
    );
  }
}
;
