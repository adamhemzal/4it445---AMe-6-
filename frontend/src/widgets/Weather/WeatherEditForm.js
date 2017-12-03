import React, { Component } from 'react';

export class WeatherEditForm extends Component {
  render() {
    return(
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Channel ID</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter channel ID"></input>
        </div>
      </form>
    )
  }
}
