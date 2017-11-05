import React, { Component } from 'react';
import { WeatherWidget } from '../widgets/Weather/WeatherWidget';
import { TopAmersWidget } from '../widgets/TopAmers/TopAmersWidget';
import { TopAmePostsWidget } from '../widgets/TopAmePosts/TopAmePostsWidget';
import { PeopleOfADayWidget } from '../widgets/PeopleOfADay/PeopleOfADayWidget';

export class Dashboard extends Component {
    render() {
        return (
            <div>

                <header className="header clearfix">

                    <div className="container">
                        <div className="logo-outer float--left">
                            <h1 className="text-center">
                                AMe
                            </h1>
                        </div>

                        <div className="intro float--left">
                            <h2 className="intro__title">Workspace dashboard</h2>
                            <h3 className="intro__description">Simple description of this dashboard</h3>
                        </div>

                    </div>

                </header>

                <div className="container">

                    <div className="row">
                        
                        <TopAmePostsWidget />
                        <TopAmersWidget />
                        <WeatherWidget />

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