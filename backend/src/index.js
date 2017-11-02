require('dotenv').config();

const express = require('express')
const app = express()

app.get('/', function (req, res) {

  const WebClient = require('@slack/client').WebClient;
  const token = process.env.SLACK_API_TOKEN || '';
  const web = new WebClient(token);
  web.channels.history('C7693MGNS', 10, function(error, response) {
    if (error) {
      console.log('Error:', error);
    } else {
      res.send(response);
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
