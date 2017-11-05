import { getSlackUser } from './getSlackUser.js';
let sortedUsersWithAme = [];
let globalRes = null;
const topAmersMaxCount = 5;

export const topAmersController = async (req, res) => {

    const WebClient = require('@slack/client').WebClient;
    const token = process.env.SLACK_API_TOKEN || '';
    const web = new WebClient(token);

    web.channels.history('C7693MGNS', {"count": 100}, (error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            /*make res global so it is accessible from callback functions*/
            globalRes = res;

            let usersWithAme = {}; /*{userID : ameCount}*/

            /*Goes through the messages and selects users who are rated with at least one AMe*/
            usersWithAme = getUsersWithAme(response.messages);

            /*Sorts the users by AMe count, result goes to global sortedUsersWithAme array*/
            getSortedAmers(usersWithAme);
            sortedUsersWithAme.slice(topAmersMaxCount);/*just selects the top N users*/

            /*pairs the users (IDs) with names and pictures, outputs them*/
            getSlackUsers(sortedUsersWithAme);
        }
    });
};

const getUsersWithAme = (messages) => {
    let usersWithAme = {};
    messages.forEach((message) => {
        const userID = message.user;
        let reactions = message.reactions;

        if (reactions !== undefined) {

            reactions.forEach((reaction) => {
                if (reaction.name === "ame") {
                    usersWithAme[userID] = usersWithAme[userID] ? usersWithAme[userID] + 1 : 1;
                }
            });
        }
    });
    return usersWithAme;
};

const getSortedAmers = (usersWithAme) => {
    let tempSortedUsersWithAme = [];
    /*sort the keys, returns Array*/
    tempSortedUsersWithAme = Object.keys(usersWithAme).sort((a, b) => {
        return usersWithAme[b] - usersWithAme[a];
    });

    /*assign ame counts to the keys (were lost in during the sorting)*/
    tempSortedUsersWithAme.forEach((userID) => {
        sortedUsersWithAme[userID] = {ameCount: usersWithAme[userID], userID: userID};
    });
};

const getSlackUsers = () => {
    const WebClient = require('@slack/client').WebClient;
    const token = process.env.SLACK_API_TOKEN || '';
    const web = new WebClient(token);

    web.users.list(getStackUsersCallback);
};

const getStackUsersCallback = (error, response) => {
    let topAmers = [];
    let i = 0;

    if (error) {
        console.log('Error:', error);
    } else {
        response.members.forEach((member) => {
            if (sortedUsersWithAme[member.id]) {
                sortedUsersWithAme[member.id]["realName"] = member.real_name;
                sortedUsersWithAme[member.id]["image"] = member.profile.image_512;
                topAmers.push(sortedUsersWithAme[member.id]);
                i++;
            }
        });

        topAmers = sortTopAmers(topAmers);/*sort once again by ame count*/
    }

    /*output the topAmers, now into the console*/
    globalRes.send(topAmers);
};

const sortTopAmers = (topAmers) => {
    topAmers.sort((a, b) => {
        return a.ameCount < b.ameCount;
    });
    return topAmers;
};