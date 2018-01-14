import React, { Component } from 'react';

import { connectDashboardId } from '../../dashboardIdProvider';

import moment from 'moment';
import InputMoment from 'react-moment-datetimepicker';
import 'react-moment-datetimepicker/dist/input-moment.css';


let widgetType = "CountDownTimer";
let widgetId = 5;

class CountDownTimerEditForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          moment: moment(),
          dashboardId: this.props.dashboardId,
        }

    }

    handleChange = moment => {
      this.setState({ moment });
    };

    handleSave = () => {
      console.log('saved', this.state.moment.format('llll'));
    };


    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });

    }

    componentDidMount() {

    }

    render() {
        return(
            <form>

              <div className="form-group">
                <label htmlFor="eventName">Event Name</label>
                <input type="text" className="form-control" value="" />
              </div>

              <div className="form-group">
                <label>Event Time</label>
                <input type="text" className="form-control" value={this.state.moment.format('llll')} readOnly />
              </div>

                <div className="form-group">
                  <InputMoment
                    moment={this.state.moment}
                    onChange={this.handleChange}
                    onSave={this.handleSave}
                    minStep={1} // default
                    hourStep={1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                  />
                </div>
            </form>
        )
    }
}

export default connectDashboardId(CountDownTimerEditForm);
