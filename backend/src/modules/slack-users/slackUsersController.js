require('dotenv').config();

const moment = require('moment');
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);


export const getList = async (req, res) => {
    web.users.list((error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            const list = getOnlyNames(response.members);
            res.send(list);
        }
    });
};

export const getDetails = async (req, res) => {
    web.users.list((error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            const list = getNamesAndImages(response.members);
            res.send(list);
        }
    });
};

const getOnlyNames = (members) => {
    let list = [];
    members.forEach(member => {
        if(member.real_name){
            list.push(member.real_name);
        }
    });
    return list;
};

const getNamesAndImages = (members) => {
    let list = [];
    members.forEach(member => {
        if(member.real_name){
            let temp = {};
            temp.id = member.id;
            temp.real_name = member.real_name;
            temp.image = member.profile.image_48;
            list.push(temp);
        }
    });
    return list;
};