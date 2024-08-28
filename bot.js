const { ActivityHandler, MessageFactory, TeamsInfo, TeamsActivityHandler } = require('botbuilder');

class EchoBot extends TeamsActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            await context.sendActivity(MessageFactory.text(JSON.stringify(context)));
            await context.sendActivity(MessageFactory.text(JSON.stringify(await TeamsInfo.getMembers(context))));
            // Get Teams channelData
            const channelData = context.activity.channelData;
            await context.sendActivity(MessageFactory.text(JSON.stringify(channelData)));

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
