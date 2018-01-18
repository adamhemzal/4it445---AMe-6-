import db from '../../models/';
require('dotenv').config();

const moment = require('moment');
let sortedUsers;
let globalRes = null;
const peopleDayMaxCount = 5;

const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);

const widgetName = 'PeopleDay';


/*

*/

export const saveWidgetSettingsToDB = async (req, res) => {
    let postData = req.body;
    let widgetType = postData.widgetType || "";
    let widgetId = postData.widgetId || "";
    let dashboardId = postData.dashboardId || "";
    let settings = postData.settings || "";

    globalRes = res;

    db.widget.update(
        {settings:settings},
        {where: {
            dashboardId: dashboardId,
            name: widgetName,}
        })
        .then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err);
    });

};

const getWidgetSettingsFromDB = (req, res) => {

  	const { dashboardId, widgetId } = req.query;

    db.widget.findOne({where: {
            dashboardId: dashboardId,
            name: widgetName}})
            .then(widget => {
                if (widget) {
            				res.send({settings: widget.settings, success: true });
                } else {
                    res.json({ success: false, message: 'Please select a user first' });
                    console.log("No such entry!");
                }
            }).catch(err => {
        console.log(err);
    });
};

export const personDayController = async (req, res) => {
    /*make res global so it is accessible from callback functions*/
    globalRes = res;

    getWidgetSettingsFromDB(req, res);

};

// const getSlackUsers = () => {
//     web.users.list(getSlackUsersCallback);
// };

// const getSlackUsersCallback = (error, response) => {
//     let peopleDay = [];
//     let i = 0;

//     if (error) {
//         console.log("Error: ", error);
//     } else {
//         response.members.forEach((member) => {
//             if ()
//         })
//     }
//}
