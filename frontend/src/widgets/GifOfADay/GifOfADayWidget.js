import React, { Component } from 'react';
import api from '../../api.js';
import axios from 'axios';

export class GifOfADayWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
          gifs: [],
          isLoading: true,
        };
      }

    render() {
        return(
            <h1>Gif of a Day</h1>
        )
    }
}