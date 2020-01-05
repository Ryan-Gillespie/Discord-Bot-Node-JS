module.exports = {
	// Starts an emoji-based vote on a given message by reacting with 👍 and 👎, which users can click on.
	
	name: 'vote',
	description: 'initiate a vote',
	cooldown: 5,
	execute(message, args) {
		// react to the message that sent the commmand
		message.react('👍').then(() => message.react('👎'));
	},
};