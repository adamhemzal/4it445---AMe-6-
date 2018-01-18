import db from '../../models/';
require('dotenv').config();

const moment = require('moment');
/*let sortedUsersWithAme;
 let globalRes = null;
 let globalResponses = [];*/
const topAmersMaxCount = 5;
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);
const ameEmoticonIdentifier = 'ame';

export const saveWidgetSettingsToDB = async (req, res) => {
	let postData = req.body;
	let widgetType = postData.widgetType || '';
	let widgetId = postData.widgetId || '';
	let dashboardId = postData.dashboardId || '';
	let settings = postData.settings || '';

	//globalRes = res;

	//console.log("Updating widget "+widgetType+" with ID="+widgetId+" and belonging to dashboard with ID="+dashboardId+" to have settings="+JSON.stringify(settings)+"///");

	db.widget
		.update(
			{ settings: settings },
			{
				where: {
					dashboardId: dashboardId,
					id: widgetId,
				},
			},
		)
		.then(result => {
			res.send(result);
		})
		.catch(err => {
			console.log(err);
		});
};

const getWidgetSettingsFromDB = (req, res) => {
	const { dashboardId, widgetId } = req.query;
	db.widget
		.findOne({
			where: {
				id: widgetId,
				dashboardId: dashboardId,
			},
		})
		.then(widget => {
			if (widget.settings) {
				getChannelHistory(widget, res);
			} else {
				res.json({ success: false, message: 'Please set the channel first' });
				console.log('No such entry!');
			}
		})
		.catch(err => {
			console.log(err);
		});
};

export const topAmersController = async (req, res) => {
	/*make res global so it is accessible from callback functions*/
	/*const {dashboardId, widgetId} = req.query;
     globalResponses[dashboardId + "_" + widgetId] = res;*/

	getWidgetSettingsFromDB(req, res);
};

const getChannelHistory = (widget, res) => {
	//timestamp pro Slack - aktualni cas - jeden tyden
	const oldestTimestamp = moment()
		.subtract(1, 'week')
		.format('X');

	const channel = widget.settings.channel;

	web.channels.history(
		channel,
		{ count: 1000, oldest: oldestTimestamp },
		(error, response) => {
			if (error) {
				console.log('Error:', error);
			} else {
				let usersWithAme = {}; /*{userID : ameCount}*/

				/*Goes through the messages and selects users who are rated with at least one AMe*/
				usersWithAme = getUsersWithAme(response.messages);

				/*Sorts the users by AMe count, result goes to global sortedUsersWithAme array*/
				let sortedUsersWithAme = getSortedAmers(usersWithAme);

				/*pairs the users (IDs) with names and pictures, outputs them*/
				getSlackUsers(sortedUsersWithAme, channel, res);
			}
		},
	);
};

const getUsersWithAme = messages => {
	let usersWithAme = {};
	messages.forEach(message => {
		let userID = message.user;
		let reactions = message.reactions;
		let file = message.file;

		if (reactions !== undefined) {
			reactions.forEach(reaction => {
				if (reaction.name === ameEmoticonIdentifier) {
					usersWithAme[userID] = usersWithAme[userID]
						? usersWithAme[userID] + reaction.count
						: reaction.count;
				}
			});
		}
		if (file !== undefined) {
			let fileReactions = file.reactions;
			if (fileReactions !== undefined) {
				fileReactions.forEach(fileReactions => {
					if (fileReactions.name === ameEmoticonIdentifier) {
						usersWithAme[userID] = usersWithAme[userID]
							? usersWithAme[userID] + fileReactions.count
							: fileReactions.count;
					}
				});
			}
		}
	});
	return usersWithAme;
};

const getSortedAmers = usersWithAme => {
	let tempSortedUsersWithAme = [];
	let sortedUsersWithAme = [];
	/*sort the keys, returns Array*/
	tempSortedUsersWithAme = Object.keys(usersWithAme).sort((a, b) => {
		return usersWithAme[b] - usersWithAme[a];
	});

	/*just selects the top N users*/
	tempSortedUsersWithAme = tempSortedUsersWithAme.slice(0, topAmersMaxCount);

	/*assign ame counts to the keys (were lost in during the sorting)*/
	tempSortedUsersWithAme.forEach(userID => {
		sortedUsersWithAme[userID] = {
			ameCount: usersWithAme[userID],
			userID: userID,
		};
	});
	return sortedUsersWithAme;
};

const getSlackUsers = (sortedUsersWithAme, channel, res) => {
	web.users.list((error, response) => {
		let topAmers = [];
		let i = 0;

		if (error) {
			console.log('Error:', error);
		} else {
			response.members.forEach(member => {
				if (sortedUsersWithAme[member.id]) {
					sortedUsersWithAme[member.id]['realName'] = member.real_name;
					sortedUsersWithAme[member.id]['image'] = member.profile.image_512;
					topAmers.push(sortedUsersWithAme[member.id]);
					i++;
				}
			});

			topAmers = sortTopAmers(topAmers); /*sort once again by ame count*/
		}

		/*output the topAmers, now into the console*/
		/*const {dashboardId, widgetId} = req.query;*/
		res.json({
			topAmers: topAmers,
			success: true,
		});
		//globalResponses.shift();
	});
};

const sortTopAmers = topAmers => {
	topAmers.sort((a, b) => {
		return a.ameCount < b.ameCount;
	});
	return topAmers;
};
