let messagesWithAme = [];
let globalRes = null;
const topAmePostsMaxCount = 5;
const objectValues = require('object-values');

export const topAmePostsController = async (req, res) => {
    const WebClient = require('@slack/client').WebClient;
    const token = process.env.SLACK_API_TOKEN || '';
    const web = new WebClient(token);

    web.channels.history('C0BUA20S0', {"count": 100}, (error, response) => {
        if (error) {
            console.log('Error:', error);
        } else {
            /*make res global so it is accessible from callback functions*/
            globalRes = res;

            /*get messages with AMe, and store only relevant info*/
            response.messages.forEach((message) => {
                const userID = message.user;
                const text = message.text;
                let reactions = message.reactions;

                if (reactions !== undefined) {
                    reactions.forEach((reaction) => {
                        if (reaction.name === "ame") {
                            messagesWithAme.push({ameCount: reaction.count, userID: userID, text: text});
                        }
                    });
                }
            });

            /*sort array by ameCount*/
            messagesWithAme = messagesWithAme.sort((a, b) => {
                return a.ameCount - b.ameCount;
            }).reverse(); /*sort is ascending, so reverse it then, so it is descending*/

            /*trim array so only top *topAmePostsMaxCount* is displayed*/
            messagesWithAme = messagesWithAme.slice(0, topAmePostsMaxCount);
            getSlackUsers();

        }
    });
};

const getSlackUsers = () => {
    const WebClient = require('@slack/client').WebClient;
    const token = process.env.SLACK_API_TOKEN || '';
    const web = new WebClient(token);

    web.users.list(getSlackUsersCallback);
};

const getSlackUsersCallback = (error, response) => {
    if (error) {
        console.log('Error:', error);
    } else {

        let slackUsers = response.members;
        let userTagsAndRealNamesPairs = [];
        userTagsAndRealNamesPairs = pairUserTagsAndRealNames(slackUsers);

        /*replace <@HD7DA6> tags in messages for realName*/
        messagesWithAme.forEach((message) => {
            message.text = replaceUserTagsWithRealNames(message.text, userTagsAndRealNamesPairs);
        });

        /*transform messagesWithAme to Object with userID as key so we can assign additional attributes*/
        let messagesWithAmeObject = {};
        messagesWithAme.forEach((message) => {
            messagesWithAmeObject[message.userID] = message;
        });

        /*assign additional attributes*/
        slackUsers.forEach((user) => {
            if (messagesWithAmeObject[user.id]) {
                messagesWithAmeObject[user.id]["realName"] = user.real_name;
                messagesWithAmeObject[user.id]["image"] = user.profile.image_32;
            }
        });

        /*transform back to array with no keys*/
        messagesWithAme = objectValues(messagesWithAmeObject);

        /*sort the array by ameCount*/
        messagesWithAme = sortMessagesWithAme(messagesWithAme);

        /*output the topAmers, now into the console*/
        globalRes.send(messagesWithAme);
    }
};

const sortMessagesWithAme = (messagesWithAme) => {
    messagesWithAme.sort((a, b) => {
        return a.ameCount < b.ameCount;
    });
    return messagesWithAme;
};

const pairUserTagsAndRealNames = (slackUsers) => {
    let userTagsAndRealNamesPairs = {};
    slackUsers.forEach((slackUser) => {
        userTagsAndRealNamesPairs[slackUser.id] = slackUser.profile.real_name;
    });
    return userTagsAndRealNamesPairs;
};

const replaceUserTagsWithRealNames = (text, userTagsAndRealNamesPairs) => {
    let userTags = [];
    userTags = text.match(/<@.+?>/g);
    if(userTags) {
        userTags.forEach((userTag) => {
            let userID = userTag.substring(2, 11);
            text = text.replace(userTag, "@"+userTagsAndRealNamesPairs[userID]);
        });
    }

    return text;
};
