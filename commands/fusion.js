module.exports = {
	// This command creates a url to the pokemon fusion website, which algorithmically creates a new pokemon
	// using different pieces and colors of both of the input pokemon.

	name: 'fusion',
	description: 'performs a pokemon fusion',
	usage: '[pokedex number] [pokedex number]', // can be blank
	aliases: ['poke'],
	cooldown: 5,
	execute(message, args) {
		const Discord = require('discord.js');

		// since poke1 and poke2 are more readable than args[0] and args[1]
		let poke1 = args[0];
		let poke2 = args[1];

		// if the first pokedex number is out of bounds or does not exist, generate a new random number
		if (!poke1 || poke1 < 1 || poke1 > 151) {
			poke1 = (Math.floor(Math.random() * (151 - 1)) + 1).toString();
		}

		// if the second pokedex number is out of bounds or does not exist, generate a new random number
		if (!poke2 || poke2 < 1 || poke2 > 151) {
			poke2 = (Math.floor(Math.random() * (151 - 1)) + 1).toString();
		}
		
		// create a Discord embed containing the link and construct the url with the correct pokedex numbers
		var embed = new Discord.RichEmbed()
			.setTitle("Here's your abomination!")
			.setURL('https://pokemon.alexonsager.net/' + poke1 + '/' + poke2);
		
		// send the response
		message.channel.send(embed);
	},
};