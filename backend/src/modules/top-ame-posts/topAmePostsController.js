import db from '../../models/';
require('dotenv').config();

const moment = require('moment');
const topAmePostsMaxCount = 5;
const objectValues = require('object-values');
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

	console.log(settings);
	console.log(widgetId);
	console.log(dashboardId);

	//globalRes = res;

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

export const topAmePostsController = async (req, res) => {
	getWidgetSettingsFromDB(req, res);
};

const getChannelHistory = (widget, res) => {
	//timestamp pro Slack - aktualni cas - jeden tyden
	const oldestTimestamp = moment()
		.subtract(1, 'week')
		.format('X');
	let messagesWithAme = [];

	const channel = widget.settings.channel;

	web.channels.history(
		channel,
		{ count: 1000, oldest: oldestTimestamp },
		(error, response) => {
			if (error) {
				console.log('Error:', error);
			} else {
				/*get messages with AMe, and store only relevant info*/
				response.messages.forEach(message => {
					const userID = message.user;
					const text = message.text;
					let reactions = message.reactions;

					if (reactions !== undefined) {
						reactions.forEach(reaction => {
							if (reaction.name === ameEmoticonIdentifier) {
								messagesWithAme.push({
									ameCount: reaction.count,
									userID: userID,
									text: text,
									link:
										'https://4it445.slack.com/messages/' +
										channel +
										'/' +
										message.ts.replace('.', ''),
								});
							}
						});
					}
				});

				/*trim array so only top *topAmePostsMaxCount* is displayed*/
				messagesWithAme = messagesWithAme.slice(0, topAmePostsMaxCount);

				getSlackUsers(messagesWithAme, channel, res);
			}
		},
	);
};

const getSlackUsers = (messagesWithAme, channel, res) => {
	web.users.list((error, response) => {
		if (error) {
			console.log('Error:', error);
		} else {
			let slackUsers = response.members;
			let userTagsAndRealNamesPairs = pairUserTagsAndRealNames(slackUsers);
			let usersData = pairUserTagsAndData(slackUsers);

			/*replace <@HD7DA6> tags in messages for realName and add additional data*/
			messagesWithAme.forEach(message => {
				message.text = replaceUserTagsWithRealNames(
					message.text,
					userTagsAndRealNamesPairs,
				);
				message.realName = usersData[message.userID].real_name;
				message.image = usersData[message.userID].image;
				message.userLink =
					'https://4it445.slack.com/threads/team/' + message.userID;
			});

			/*transform back to array with no keys*/
			messagesWithAme = objectValues(messagesWithAme);

			/*sort the array by ameCount*/
			messagesWithAme = sortMessagesWithAme(messagesWithAme);

			res.json({
				topAmePosts: messagesWithAme,
				channel: channel,
				success: true,
			});
		}
	});
};

const sortMessagesWithAme = messagesWithAme => {
	messagesWithAme.sort((a, b) => {
		return a.ameCount < b.ameCount;
	});
	return messagesWithAme;
};

const pairUserTagsAndRealNames = slackUsers => {
	let userTagsAndRealNamesPairs = {};
	slackUsers.forEach(slackUser => {
		userTagsAndRealNamesPairs[slackUser.id] = slackUser.profile.real_name;
	});
	return userTagsAndRealNamesPairs;
};

const pairUserTagsAndData = slackUsers => {
	let usersData = {};
	slackUsers.forEach(slackUser => {
		usersData[slackUser.id] = {
			real_name: slackUser.profile.real_name,
			image: slackUser.profile.image_32,
		};
	});
	return usersData;
};

const replaceUserTagsWithRealNames = (text, userTagsAndRealNamesPairs) => {
	let userTags = [];
	userTags = text.match(/<@.+?>/g);
	if (userTags) {
		userTags.forEach(userTag => {
			let userID = userTag.substring(2, 11);
			text = text.replace(userTag, '@' + userTagsAndRealNamesPairs[userID]);
		});
	}
	return text;
};
