export const topAmersController = async (req, res) => {
  const WebClient = require('@slack/client').WebClient;
  const token = process.env.SLACK_API_TOKEN || '';
  const web = new WebClient(token);

  web.channels.history('C7693MGNS', {"count": 5}, function(error, response) {
    if (error) {
      console.log('Error:', error);
    } else {
      // TODO zpracování načtených zpráv a odeslání na výstup.
      res.send(response);
    }
  });
};
