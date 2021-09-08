const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');

// initialize client and within it initialize an object to store all the commands
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.serverData = require('./storage/serverData.json'); // load serverData to client

// get every file in the commands folder that ends with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// load all those commands and store them in client.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// initialize cooldownns collection
const cooldowns = new Discord.Collection(); 

// called when the client is fully initialized
client.once('ready', () => {
	console.log('Ready!'); // let us know that the bot is online
});

// called on every message sent in server(s) this bot is a part of. Do all command processing here
client.on('message', message => {
	// if the channel is someone's direct messages, ignore it
	if (!message.channel.id) {
		return;
	}
	
	// load command prefix from serverData 
	const prefix = '!';

	// If the message does not start with the command prefix, ignore it
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// split the content of the message into the command and its arguments
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// get the appropriate command from client.commands
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// if we failed to get a valid command, ignore it
	if (!command) return;

	// if there are no args and the command requires arguments, let the user know and include proper usage
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// if the command has a cooldown, set it in the discord collection
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	// initialize necessary items for checking the cooldown
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	// check the timestamps to see if the author has a cooldown going
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		// stop the user from executing the command while its on cooldown
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	// if the cooldown is done, delete it from timestamps
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// try to execute the command, and if it doesn't work, send an error message to the user
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// runs when the client logs in to Discord
client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag);
	// set the user activity to something fun this will say: Playing With SCP-999
	client.user.setActivity('With SCP-999');
});

// These are just the two reaction types I care about for using reactions to assign roles
const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// found this online, All it does is ensure that every event is emitted, as sometimes the Discord API skips over them
client.on('raw', event => {
	if (!events.hasOwnProperty(event.t)) return;
	if (event.user === client) return;

	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) ||  user.createDM();

	if (channel.messages.has(data.message_id)) return;

	const message = channel.fetchMessage(data.message_id);
	const emojiKey = (data.emoji.id) ? '${data.emoji.name}:${data.emoji.id}' : data.emoji.name;
	let reaction = message.reactions.get(emojiKey);

	if (!reaction) {
		const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
		reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
	}

	client.emit(events[event.t], reaction, user);
});

// runs whenever a user reacts to something, plan to add a role to the user depending on what reaction they select
client.on('messageReactionAdd', (reaction, user) => {
	/*
	if (reaction.message.channel.id == serverData[reaction.message.channel.guild.id].roleChannel && serverData[reaction.messag.guild.id].roles) {
		user.addRole(message.guild.roles.find(role => role.name === reaction.emoji.name));
	}*/
	console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});

// runs whenever a user removes their reaction to a message, plan to remove a role corresponding to the reaction they remove
client.on('messageReactionRemove', (reaction, user) => {
	/*
	if (reaction.message.channel.id == serverData[reaction.message.channel.guild.id].roleChannel && serverData[reaction.messag.guild.id].roles) {
		user.removeRole(message.guild.roles.find(role => role.name === reaction.emoji.name));
	}*/
	console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});

// have the client log in to Discord
client.login(token);