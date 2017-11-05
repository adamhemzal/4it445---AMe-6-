<<<<<<< HEAD
require('dotenv').config();

import { value as sortByValue, sortDirection } from 'sort-object-properties';

const moment = require('moment');
const WebClient = require('@slack/client').WebClient;
const token = process.env.SLACK_API_TOKEN || '';
const web = new WebClient(token);
const topAmersMaxCount = 5;

export const topAmersController = async (req, res) => {
  //timestamp pro Slack - aktualni cas - jeden tyden
  const oldestTimestamp = moment().subtract(1, 'week').format('X');

  web.channels.history('C0BUA20S0', {'count': 1000, 'oldest': oldestTimestamp})
  .then(response => {
    let usersData = [];
    const sortedUsersWithAme = getSortedUsersWithAme(response.messages);
    const promises = getUsersDataFromSlack(sortedUsersWithAme);
    Promise.all(promises).then(responses => {
      responses.forEach(response => {
        let { id } = response.user;
        let { real_name: name, image_512: image } = response.user.profile;
        usersData.push({name: name, image: image, count: sortedUsersWithAme[id]});
      });
      //odeslani na vystup
      res.send(usersData);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
  })
  .catch(error => {
    console.log('Error: ', error);
  });
}

const getSortedUsersWithAme = messages => {
  let usersWithAme = {};
  let sortedUsersWithAme = {};
  messages.forEach(message => {
    const userId = message.user;
    let reactions = message.reactions;
    if (reactions !== undefined) {
      reactions.forEach((reaction) => {
        if (reaction.name === "ame") {
          usersWithAme[userId] = usersWithAme[userId] ? usersWithAme[userId] + 1 : 1;
        }
      });
      sortedUsersWithAme = sortByValue(usersWithAme, sortDirection.descending);
      // sortedUsersWithAme.slice(topAmersMaxCount + 1);
    }
  });
  return sortedUsersWithAme;
}

const getUsersDataFromSlack = usersWithAme => {
  var promises = [];
  for (let userId in usersWithAme) {
    var promise = web.users.info(userId);
    promises.push(promise);
  }
  return promises;
}
=======
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
            sortedUsersWithAme.slice(0, topAmersMaxCount);/*just selects the top N users*/

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

    web.users.list(getSlackUsersCallback);
};

const getSlackUsersCallback = (error, response) => {
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
>>>>>>> 18bc91e41cacb7c665f0580e191c3da5ddb52909
