const Discord = require('discord.js');

module.exports = {
	// Gets the serverData for this server and displays it to the user. Only used for debugging purposes

	name: 'getdata',
	description: 'gets the stored server data for this server',
	execute(message, args) {
		// load serverData.json and pick out the correct server
		const serverData = require('../storage/serverData.json');
		const data = serverData[message.guild.id];

		// create the string containing the data
		let serverDat = 'Server Id: ' + message.guild.id + '\n' +
			'Role Channel ID: ' + data.roleChannel + '\n' +
			'Roles: ' + data.roles.join(', ') + '\n' +
			'Role Message: ' + data.message + '\n' +
			'Prefix: ' + data.prefix;
		
		// create a nice looking Discord embed
		var embed = new Discord.RichEmbed()
			.setTitle("Data for " + message.guild.name)
			.setDescription(serverDat)
		
		// send the embed to the user
		message.channel.send(embed);
	},
};