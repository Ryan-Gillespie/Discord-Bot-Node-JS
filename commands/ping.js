module.exports = {
	// A Hello World command to just test to see if the bot is online

	name: 'ping',
	description: 'Ping!',
	aliases: ['pong'],
	cooldown: 5,
	execute(message, args) {
		// just send the message back
		message.channel.send('Pong!');
		//message.reply('Pong!'); // use the message.reply() if we're feeling fancy
	},
};