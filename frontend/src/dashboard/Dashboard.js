import React, { Component } from 'react';
import AMer from '../img/amer.png';
import { WeatherWidget } from '../widgets/Weather/WeatherWidget';

export class Dashboard extends Component {
    render() {
        return (
            <div>

                <header className="header">
                    <div className="container">
                        <h1 className="text-center">Ame</h1>
                    </div>
                </header>

                <div className="container">

                    <div className="row">
                        <div className="col-sm-12">
                            <div className="intro">
                                <h2 className="intro__title">Workspace dashboard</h2>
                                <h3 className="intro__description">Simple description of this dashboard</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
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


                        <div className="col-md-4">
                            <h2>Heading</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
                            <WeatherWidget />
                        </div>
                    </div>

                    <hr/>

                    <footer>
                        <p>&copy; AMe 2017</p>
                    </footer>

                </div>

        </div>
        )
    }
}