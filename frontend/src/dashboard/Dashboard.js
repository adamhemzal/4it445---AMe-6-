import React, { Component } from 'react';
import { WeatherWidget } from '../widgets/Weather/WeatherWidget';
import { TopAmersWidget } from '../widgets/TopAmers/TopAmersWidget';
import { TopAmePostsWidget } from '../widgets/TopAmePosts/TopAmePostsWidget';
import { PeopleOfADayWidget } from '../widgets/PeopleOfADay/PeopleOfADayWidget';

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