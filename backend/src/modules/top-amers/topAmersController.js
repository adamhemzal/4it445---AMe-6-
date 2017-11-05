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
