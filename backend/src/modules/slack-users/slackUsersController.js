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
            const list = getNamesAndImages(response.members);
            res.send(list);
        }
    });
};

export const getDetail = async (req, res) => {
    const {id} = req.params;
    web.users.list((error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            let userDetail = {};
            response.members.forEach(member => {
                if (member.id == id) {
                    userDetail.id = member.id;
                    userDetail.real_name = member.real_name;
                    userDetail.image = member.profile.image_512;
                }
            });
            res.send(userDetail);
        }
    });
};

const getOnlyNames = (members) => {
    let list = [];
    members.forEach(member => {
        if (member.real_name) {
            list.push(member.real_name);
        }
    });
    return list;
};

const getNamesAndImages = (members) => {
    let list = [];
    members.forEach(member => {
        if (member.real_name) {
            let temp = {};
            temp.id = member.id;
            temp.real_name = member.real_name;
            temp.avatar = member.profile.image_48;
            temp.image = member.profile.image_512;
            list.push(temp);
        }
    });
    return list;
};
