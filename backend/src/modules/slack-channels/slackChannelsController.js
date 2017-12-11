require('dotenv').config();

const moment = require('moment');
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);

export const slackChannelsController = async (req, res) => {

    web.channels.list({exclude_archived:true, exclude_members:true},(error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            const channels = response.channels;
            let reducedChannels = [];
            
            
            channels.forEach( (channel) => {
                reducedChannels.push({
                    id: channel.id, 
                    name: channel.name,
                });
            } );
            res.send(reducedChannels);
        }
    });
}