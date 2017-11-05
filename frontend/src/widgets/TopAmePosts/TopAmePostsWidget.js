import React, { Component } from 'react';

export class TopAmePostsWidget extends Component {
    render() {
        return(
                                <div className="col-md-4 widget top_posts">
            
                                        <div className="widget__inner">
            
                                            <div className="widget__header clearfix">
                                                <h2 className="float--left widget__name">Top AMe Posts</h2>
                                                <h3 className="float--right">4IT445 <span>#general</span></h3>
                                            </div>
            
                                            <div className="widget__content widget__content--padding">
                                                <ul className="top_posts__list">
                                                    <li className="top_posts__list-item">
                                                        <h3 className="top_posts_post-title">My super popular post, that everybody likes</h3>
                                                        <div className="clearfix">
                                                            <h4 className="top_posts__name"><a href="#">@jankodes</a></h4>
                                                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i> 65</h5>
                                                        </div>
                                                    </li>
                                                    <li className="top_posts__list-item">
                                                        <h3 className="top_posts_post-title">My super popular post, that everybody likes</h3>
                                                        <div className="clearfix">
                                                            <h4 className="top_posts__name"><a href="#">@jankodes</a></h4>
                                                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i> 65</h5>
                                                        </div>
                                                    </li>
                                                    <li className="top_posts__list-item">
                                                        <h3 className="top_posts_post-title">My super popular post, that everybody likes</h3>
                                                        <div className="clearfix">
                                                            <h4 className="top_posts__name"><a href="#">@jankodes</a></h4>
                                                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i> 65</h5>
                                                        </div>
                                                    </li>
                                                    <li className="top_posts__list-item">
                                                        <h3 className="top_posts_post-title">My super popular post, that everybody likes</h3>
                                                        <div className="clearfix">
                                                            <h4 className="top_posts__name"><a href="#">@jankodes</a></h4>
                                                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i> 65</h5>
                                                        </div>
                                                    </li>
                                                    <li className="top_posts__list-item">
                                                        <h3 className="top_posts_post-title">My super popular post, that everybody likes</h3>
                                                        <div className="clearfix">
                                                            <h4 className="top_posts__name"><a href="#">@jankodes</a></h4>
                                                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i> 65</h5>
                                                        </div>
                                                    </li>
                                                </ul>
            
                                            </div>
            
                                            <div className="widget__footer text-center">
                                                <a className="btn btn--link" href="#" role="button">See All</a>
                                            </div>
            
                                        </div>
            
                                    </div>
        )
    }
}