let messagesWithAme = [];
let globalRes = null;
const topAmePostsMaxCount = 5;

export const topAmePostsController = async (req, res) => {
    const WebClient = require('@slack/client').WebClient;
    const token = process.env.SLACK_API_TOKEN || '';
    const web = new WebClient(token);
    
    web.channels.history('C7693MGNS', {"count": 100}, (error, response) => {
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
            messagesWithAme.sort((a, b) => {
                return a.ameCount < b.ameCount;
            });

            /*trim array so only top N is displayed*/
            messagesWithAme.slice(0, topAmePostsMaxCount);
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

        /*transform messagesWithAme to Object with userID as key so we can assign additional attributes*/
        let messagesWithAmeObject = {};
        messagesWithAme.forEach((message) => {
            messagesWithAmeObject[message.userID] = message;
        });

        /*assign additional attributes*/
        response.members.forEach((member) => {
            if (messagesWithAmeObject[member.id]) {
                messagesWithAmeObject[member.id]["realName"] = member.real_name;
                messagesWithAmeObject[member.id]["image"] = member.profile.image_32;
            }
        });
        
        /*transform back to array with no keys*/
        messagesWithAme = Object.values(messagesWithAmeObject);
        
        /*sort the array by ameCount*/
        messagesWithAme = sortMessagesWithAme(messagesWithAme);
    }

    /*output the topAmers, now into the console*/
    globalRes.send(messagesWithAme);
};

const sortMessagesWithAme = (messagesWithAme) => {
    messagesWithAme.sort((a, b) => {
        return a.ameCount < b.ameCount;
    });
    return messagesWithAme;
};