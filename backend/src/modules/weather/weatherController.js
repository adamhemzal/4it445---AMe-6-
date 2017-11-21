import db from '../../models/';
require('dotenv').config();

const widgetName = "Weather";
const dashboardId = 1; //TODO take current dashboard ID


export const weatherController = async (req, res) => {
    db.widget.findOne({where: {
            dashboardId: dashboardId,
            name: widgetName}})
            .then(widget => {
                if (widget) {
                    res.send(widget.settings.cities);
                } else {
                    console.log("No such entry!");
                }
            }).catch(err => {
        console.log(err);
    });

};