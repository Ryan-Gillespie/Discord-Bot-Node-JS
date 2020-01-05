module.exports = {
	// This command creates a url that leads to a page on Pokemondb.net corresponding to that pokemon.

	name: 'pokedex',
	description: 'gets the pokemondb page for a specific pokemon',
	usage: '[name of pokemon]',
	args: true,
	aliases: ['dex'],
	cooldown: 5,
	execute(message, args) {
		const Discord = require('discord.js');

		// the pokemon we're looking up should be the first argument
		let pokemon = args[0];
		
		// create a nice Discord embed to store the link
		var embed = new Discord.RichEmbed()
			.setTitle(pokemon)
			.setURL('https://pokemondb.net/pokedex/' + pokemon);
		
		// send the embed to the user
		message.channel.send(embed);
	},
};