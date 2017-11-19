require('dotenv').config();

let messagesWithAme = [];
let globalRes = null;
const moment = require('moment');
const topAmePostsMaxCount = 5;
const objectValues = require('object-values');
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);
const channel = 'C0BUA20S0';

export const topAmePostsController = async (req, res) => {
  //timestamp pro Slack - aktualni cas - jeden tyden
  const oldestTimestamp = moment().subtract(1, 'week').format('X');

  web.channels.history(channel, {'count': 1000, 'oldest': oldestTimestamp}, (error, response) => {
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
              messagesWithAme.push({
                  ameCount: reaction.count, 
                  userID: userID, 
                  text: text,
                  link: "https://4it445.slack.com/archives/"+channel+"/"+(message.ts.replace(".", "")),
              });
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
  web.users.list(getSlackUsersCallback);
};

const getSlackUsersCallback = (error, response) => {
  if (error) {
    console.log('Error:', error);
  } else {

    let slackUsers = response.members;
    let userTagsAndRealNamesPairs = pairUserTagsAndRealNames(slackUsers);
    let usersData = pairUserTagsAndData(slackUsers);


    /*replace <@HD7DA6> tags in messages for realName and add additional data*/
    messagesWithAme.forEach((message) => {
      message.text = replaceUserTagsWithRealNames(message.text, userTagsAndRealNamesPairs);
      message.realName = usersData[message.userID].real_name;
      message.image = usersData[message.userID].image;
      message.userLink = "https://4it445.slack.com/threads/team/"+message.userID;
    });

    /*transform back to array with no keys*/
    messagesWithAme = objectValues(messagesWithAme);

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

const pairUserTagsAndData = slackUsers => {
  let usersData = {};
  slackUsers.forEach((slackUser) => {
    usersData[slackUser.id] = {
      "real_name": slackUser.profile.real_name,
      "image": slackUser.profile.image_32
    };
  });
  return usersData;
}

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
