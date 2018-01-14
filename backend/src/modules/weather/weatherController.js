import db from '../../models/';
require('dotenv').config();

const widgetName = "Weather";
const dashboardId = 1; //TODO take current dashboard ID

export const saveWidgetSettingsToDB = async (req, res) => {

    let postData = req.body;
    let widgetType = postData.widgetType || "";
    let widgetId = postData.widgetId || "";
    let dashboardId = postData.dashboardId || "";
    let settings = postData.settings || "";

    //console.log("Updating widget "+widgetType+" with ID="+widgetId+" and belonging to dashboard with ID="+dashboardId+" to have settings="+JSON.stringify(settings)+"///");

    db.widget.update(
            {settings:settings},
            {where: {
                dashboardId: dashboardId,
                name: widgetName,
                /*id: widgetId*/}
            })
            .then(result => {
                res.send(result);
            }).catch(err => {
        console.log(err);
    });

};

export const weatherController = async (req, res) => {
    db.widget.findOne({where: {
            dashboardId: dashboardId,
            name: widgetName}})
            .then(widget => {
                if (widget) {
                    res.send(widget.settings);
                } else {
                    console.log("No such entry!");
                }
            }).catch(err => {
        console.log(err);
    });

};
