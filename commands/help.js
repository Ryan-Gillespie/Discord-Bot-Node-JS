const { prefix } = require('../config.json');

module.exports = {
	// This command either direct messages a user a list of commands for this server or provides
	// correct usage for a given command.

	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		// initialize data, which will store a list of all the commands, and commands
		const data = [];
		const { commands } = message.client;

		// if there are no arguments, list all the commands and DM the user.
		if (!args.length) {
			// push everything onto data so we can send it to the user
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix | '!'}help [command name]\` to get info on a specific command!`);

			// send the direct message to the user
			return message.author.send(data, { split: true })
				// also let the user know that we sent them a DM
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		// if we are given a command name, give the user the proper usage for that command

		// get the command name, and try to find the command specified
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		// ignore this request if they did not get a valid command
		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		// push the command name onto data along with all the other data associated with that command
		data.push(`**Name:** ${command.name}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		// send the message
		message.channel.send(data, { split: true });
	},
};