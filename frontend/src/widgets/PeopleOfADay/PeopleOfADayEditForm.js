import React, { Component } from 'react';
import { connectDashboardId } from '../../dashboardIdProvider';

class PeopleOfADayEditForm extends Component {
  render() {
    return (
      <form>
        <div class="form-group">
          <label for="channelId">Channel ID</label>
          <input type="text" className="form-control" id="chnnelId" placeholder="Enter channel ID"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultText}</div> */}
        </div>

        <div class="form-group">
          <label for="p1Comment">Person 1 ID</label>
          <input id = "p1Comment" type="text" className="form-control" placeholder="Enter person comment"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultPerson1}</div> */}
        </div>

        <div class="form-group">
          <label for="p1Comment">Person 2 ID</label>
          <input id = "p1Comment" type="text" className="form-control" placeholder="Enter person comment"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultPerson1}</div> */}
        </div>

        <div class="form-group">
          <label for="p1Comment">Person 3 ID</label>
          <input id = "p1Comment" type="text" className="form-control" placeholder="Enter person comment"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultPerson1}</div> */}
        </div>

        <div class="form-group">
          <label for="p1Comment">Person 4 ID</label>
          <input id = "p1Comment" type="text" className="form-control" placeholder="Enter person comment"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultPerson1}</div> */}
        </div>

        <div class="form-group">
          <label for="p1Comment">Person 5 ID</label>
          <input id = "p1Comment" type="text" className="form-control" placeholder="Enter person comment"></input>
          <button className="btn" onClick={this.submit}>Uložit</button>
          {/* <div className="edit-result">{this.state.resultPerson1}</div> */}
        </div>



      </form>
    );
  }
}

export default connectDashboardId(PeopleOfADayEditForm);
