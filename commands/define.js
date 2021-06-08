module.exports = {
	// This command querys the Urban Dictionary API and returns the output to the user

	name: 'define',
	description: 'Gets the Urban Dictionary definition of a word',
	usage: '[word/phrase]', // can be blank
	aliases: ['urban'],
	cooldown: 5,
	async execute(message, args) {
		const fetch = require('node-fetch');
		const querystring = require('querystring');

		// make sure we were given arguments
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		// make the query to Urban Dictionary
		const query = querystring.stringify({ term: args.join(' ') });
		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
		
		message.channel.send(list[0].definition)
	},
};