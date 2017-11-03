export const topAmersController = async (req, res) => {
  const WebClient = require('@slack/client').WebClient;
  const token = process.env.SLACK_API_TOKEN || '';
  const web = new WebClient(token);

  web.channels.history('C7693MGNS', {"count": 5}, function(error, response) {
    if (error) {
      console.log('Error:', error);
    } else {
       res.send(response);
                let ameCounts = new Array(); // [author : numberOfAmes]
                
                response.messages.forEach(function(message){
                    const author = message.user;
                    let reactions = message.reactions;
                    
                    if(reactions !== undefined){
                        
                        reactions.forEach(function(reaction){
                            if(reaction.name === "ame"){
                                if(ameCounts[author] !== undefined){
                                    ameCounts[author] += reaction.count;
                                } else {
                                    ameCounts[author] = reaction.count;
                                }    
                            }
                        });
                    }
                });
                
                return ameCounts;
    }
  });
};
