
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(process.env.clientSigningSecret);

// *** Plug the event adapter into the express app as middleware ***
const eventsHandler = slackEvents.expressMiddleware();

// *** Greeting any user that says "hi" ***
slackEvents.on('message', (message, body) => {
    // Only deal with messages that have no subtype (plain messages) and contain 'hi'
    if (!message.subtype && message.text.indexOf('hi') >= 0) {
      // Initialize a client
      const slack = getClientByTeamId(body.team_id);
      // Handle initialization failure
      if (!slack) {
        return console.error('No authorization found for this team. Did you install this app again after restarting?');
      }
      // Respond to the message back in the same channel
      slack.chat.postMessage({ channel: message.channel, text: `Hello <@${message.user}>! :tada:` })
        .catch(console.error);
    }
  });

  module.exports = eventsHandler;