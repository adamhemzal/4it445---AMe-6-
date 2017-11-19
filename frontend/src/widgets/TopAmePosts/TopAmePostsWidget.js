import React, { Component } from 'react';
import axios from 'axios';
import api from '../../api.js';

export class TopAmePostsWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topAmePosts: []
        };
    }

    componentDidMount() {
        api('top-ame-posts')
                .then(response => {
                    const {data: topAmePosts} = response;
                    this.setState({topAmePosts});
                })
                .catch(error => {
                    console.log(error);
                });
    }

    render() {
        const {topAmePosts} = this.state;

        return(
                <div className="col-md-4 widget top_posts">

                    <div className="widget__inner">

                        <div className="widget__header clearfix">
                            <h2 className="float--left widget__name">Top AMe Posts</h2>
                            <h3 className="float--right">4IT445 <span>#general</span></h3>
                        </div>

                        <div className="widget__content widget__content--padding">
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
                <div>
                    <li className="top_posts__list-item">
                        <h3 className="top_posts_post-title">{this.props.data.text}</h3>
                        <div className="clearfix">
                            <h4 className="top_posts__name"><a href="#">{this.props.data.realName}</a></h4>
                            <h5 className="top_posts__likes"><i className="fa fa-thumbs-o-up"></i>x{this.props.data.ameCount}</h5>
                        </div>
                    </li>
                </div>
                );
    }
}
;
