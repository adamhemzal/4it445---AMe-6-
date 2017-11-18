import React, { Component } from 'react';
import { WeatherWidget } from '../widgets/Weather/WeatherWidget';
import { TopAmersWidget } from '../widgets/TopAmers/TopAmersWidget';
import { TopAmePostsWidget } from '../widgets/TopAmePosts/TopAmePostsWidget';
import { PeopleOfADayWidget } from '../widgets/PeopleOfADay/PeopleOfADayWidget';
import { HamburgerMenu } from './menu/HamburgerMenu';
import logo from '../img/logo.png';
//import { Admin } from '../admin/Admin';

export class Dashboard extends Component {

    

    render() {
        return (
            <div>

                <header className="header clearfix">

                    <div className="container-fluid flexbox">
                        <div className="logo-outer">
                            <img src={logo} alt="Logo AMe"/>
                        </div>

                        <div className="intro">
                            <h2 className="intro__title">Workspace dashboard</h2>
                            <h3 className="intro__description">Simple description of this dashboard</h3>
                        </div>

                        <HamburgerMenu />

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