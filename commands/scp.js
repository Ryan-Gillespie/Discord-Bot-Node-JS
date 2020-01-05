module.exports = {
	// Gets a random or specified SCP article form the SCP wiki. Warning: very spooky.

	name: 'scp',
	description: 'gets an scp from the scp wiki',
	usage: '[scp number optional]',
	aliases: ['spooky'],
	cooldown: 5,
	execute(message, args) {
		const Discord = require('discord.js');

		// initialize a number to store the scp in
		let number = 0;

		// get a random scp number 001 - 4999
		if (args.length === 0 || parseInt(args[0]) < 1 || parseInt(args[0]) > 4999) {
			number = (Math.floor(Math.random() * (4999 - 1)) + 1).toString();
		}
		// if an scp was specified, set number to the first argument
		else {
			number = args[0];
		}
		
		// properly format the number into a string (0-99 must start with one or tow 0's)
		if (number.length === 1) number = "00" + number;
		else if (number.length === 2) number = "0" + number;
		
		// create a nice Discord embed with the link
		var embed = new Discord.RichEmbed()
			.setTitle("SCP-" + number)
			.setURL('http://www.scp-wiki.net/scp-' + number);
		
		// send the link to the channel
		message.channel.send(embed);
	},
};