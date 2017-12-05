import db from '../../models/';
require('dotenv').config();

const moment = require('moment');
let sortedUsersWithAme;
let globalRes = null;
const peopleDayMaxCount = 5;

const widgetName = "PeopleDay";
const dashboardId = 1; //TODO take current dashboard ID
//const channel = 'C0BUA20S0'; //unused, now fetched from DB

const getWidgetSettingsFromDB = () => {

    db.widget.findOne({where: {
            dashboardId: dashboardId,
            name: widgetName}})
            .then(widget => {
                if (widget) {
                    
                } else {
                    console.log("No such entry!");
                }
            }).catch(err => {
        console.log(err);
    });
};

export const peopleDayController = async (req, res) => {
    /*make res global so it is accessible from callback functions*/
    globalRes = res;

    getWidgetSettingsFromDB();

};
